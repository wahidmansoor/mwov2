#!/usr/bin/env python3
"""
OncoVista Database Schema Test Suite
Validate migration generator and schema evolution
"""

import unittest
import sys
import os
import json
from unittest.mock import patch, MagicMock

# Add the schema_evolver directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'schema_evolver'))

try:
    from migration_generator import OncoVistaSchemaEvolver
except ImportError as e:
    print(f"❌ Failed to import migration_generator: {e}")
    sys.exit(1)

class TestSchemaEvolution(unittest.TestCase):
    """Test suite for schema evolution functionality"""
    
    def setUp(self):
        """Set up test environment"""
        self.evolver = OncoVistaSchemaEvolver()
        
        # Mock database connection
        self.mock_db = MagicMock()
        self.evolver.db = self.mock_db
        
        # Sample schema data
        self.sample_schema = {
            'tables': {
                'patients': {
                    'id': 'SERIAL PRIMARY KEY',
                    'name': 'VARCHAR(255) NOT NULL',
                    'email': 'VARCHAR(255) UNIQUE',
                    'created_at': 'TIMESTAMP DEFAULT NOW()'
                },
                'treatments': {
                    'id': 'SERIAL PRIMARY KEY',
                    'patient_id': 'INTEGER REFERENCES patients(id)',
                    'protocol': 'TEXT',
                    'status': 'VARCHAR(50) DEFAULT \'active\''
                }
            }
        }
    
    def test_schema_comparison(self):
        """Test schema comparison functionality"""
        old_schema = {
            'tables': {
                'patients': {
                    'id': 'SERIAL PRIMARY KEY',
                    'name': 'VARCHAR(255) NOT NULL'
                }
            }
        }
        
        new_schema = {
            'tables': {
                'patients': {
                    'id': 'SERIAL PRIMARY KEY',
                    'name': 'VARCHAR(255) NOT NULL',
                    'email': 'VARCHAR(255) UNIQUE'
                }
            }
        }
        
        differences = self.evolver.compare_schemas(old_schema, new_schema)
        self.assertIsInstance(differences, list)
        self.assertTrue(len(differences) > 0)
    
    def test_migration_generation(self):
        """Test migration SQL generation"""
        changes = [
            {'type': 'add_column', 'table': 'patients', 'column': 'email', 'definition': 'VARCHAR(255) UNIQUE'},
            {'type': 'add_table', 'table': 'medications', 'schema': {'id': 'SERIAL PRIMARY KEY', 'name': 'VARCHAR(255)'}}
        ]
        
        migration_sql = self.evolver.generate_migration(changes)
        self.assertIsInstance(migration_sql, str)
        self.assertIn('ALTER TABLE', migration_sql)
        self.assertIn('CREATE TABLE', migration_sql)
    
    def test_rollback_generation(self):
        """Test rollback SQL generation"""
        changes = [
            {'type': 'add_column', 'table': 'patients', 'column': 'email', 'definition': 'VARCHAR(255) UNIQUE'}
        ]
        
        rollback_sql = self.evolver.generate_rollback(changes)
        self.assertIsInstance(rollback_sql, str)
        self.assertIn('DROP COLUMN', rollback_sql)
    
    def test_backup_creation(self):
        """Test database backup functionality"""
        with patch('subprocess.run') as mock_run:
            mock_run.return_value.returncode = 0
            result = self.evolver.create_backup('test_db')
            self.assertTrue(result)
    
    def test_migration_validation(self):
        """Test migration validation"""
        valid_migration = """
        ALTER TABLE patients ADD COLUMN email VARCHAR(255) UNIQUE;
        CREATE INDEX idx_patients_email ON patients(email);
        """
        
        invalid_migration = """
        DROP TABLE patients; -- This should fail validation
        """
        
        self.assertTrue(self.evolver.validate_migration(valid_migration))
        self.assertFalse(self.evolver.validate_migration(invalid_migration))

class TestDatabaseConnection(unittest.TestCase):
    """Test database connection and basic operations"""
    
    def test_connection_string_parsing(self):
        """Test database connection string parsing"""
        evolver = OncoVistaSchemaEvolver()
        
        # Test valid connection string
        valid_conn = "postgresql://user:pass@localhost:5432/oncovista"
        parsed = evolver.parse_connection_string(valid_conn)
        
        self.assertEqual(parsed['host'], 'localhost')
        self.assertEqual(parsed['port'], '5432')
        self.assertEqual(parsed['database'], 'oncovista')
        self.assertEqual(parsed['user'], 'user')
    
    def test_schema_introspection(self):
        """Test schema introspection"""
        evolver = OncoVistaSchemaEvolver()
        
        # Mock database response
        mock_tables = [
            {'table_name': 'patients', 'column_name': 'id', 'data_type': 'integer'},
            {'table_name': 'patients', 'column_name': 'name', 'data_type': 'character varying'}
        ]
        
        with patch.object(evolver, 'query_database') as mock_query:
            mock_query.return_value = mock_tables
            schema = evolver.introspect_schema()
            
            self.assertIsInstance(schema, dict)
            self.assertIn('tables', schema)

def run_tests():
    """Run all tests and return results"""
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test classes
    suite.addTests(loader.loadTestsFromTestCase(TestSchemaEvolution))
    suite.addTests(loader.loadTestsFromTestCase(TestDatabaseConnection))
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    return result.wasSuccessful(), result.testsRun, len(result.failures), len(result.errors)

if __name__ == '__main__':
    print("🧪 SCHEMA EVOLUTION TEST SUITE")
    print("=" * 50)
    
    success, total, failures, errors = run_tests()
    
    print(f"\n📊 TEST RESULTS:")
    print(f"   Total: {total}")
    print(f"   Failures: {failures}")
    print(f"   Errors: {errors}")
    print(f"   Success: {'✅ YES' if success else '❌ NO'}")
    
    sys.exit(0 if success else 1)
