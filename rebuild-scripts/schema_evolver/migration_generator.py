#!/usr/bin/env python3
"""
OncoVista Schema Migration Generator
Medical-grade precision schema evolution tool
"""

import json
import re
import sys
from datetime import datetime
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
from pathlib import Path

@dataclass
class SchemaChange:
    """Represents a single schema mutation"""
    change_type: str  # 'ADD_TABLE', 'DROP_TABLE', 'ADD_COLUMN', etc.
    table_name: str
    details: Dict[str, Any]
    risk_level: str  # 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    rollback_sql: str

class SchemaDNAAnalyzer:
    """Analyzes schema DNA for mutations"""
    
    def __init__(self):
        self.critical_tables = [
            'patients', 'treatments', 'medications', 'protocols',
            'users', 'roles', 'permissions', 'audit_logs'
        ]
        
    def extract_schema_dna(self, schema_file: str) -> Dict[str, Any]:
        """Extract schema structure from SQL file"""
        with open(schema_file, 'r') as f:
            content = f.read()
        
        # Extract tables
        table_pattern = r'CREATE TABLE\s+(\w+)\s*\((.*?)\);'
        tables = {}
        
        for match in re.finditer(table_pattern, content, re.DOTALL | re.IGNORECASE):
            table_name = match.group(1)
            columns_sql = match.group(2)
            
            # Parse columns
            columns = self._parse_columns(columns_sql)
            tables[table_name] = {
                'columns': columns,
                'constraints': self._parse_constraints(columns_sql),
                'indexes': self._extract_indexes(content, table_name)
            }
        
        return {
            'tables': tables,
            'functions': self._extract_functions(content),
            'triggers': self._extract_triggers(content),
            'types': self._extract_types(content)
        }
    
    def _parse_columns(self, columns_sql: str) -> Dict[str, Dict]:
        """Parse column definitions"""
        columns = {}
        lines = [line.strip() for line in columns_sql.split(',')]
        
        for line in lines:
            if not line or line.startswith('CONSTRAINT'):
                continue
                
            parts = line.split()
            if len(parts) >= 2:
                col_name = parts[0].strip('"')
                col_type = parts[1]
                
                columns[col_name] = {
                    'type': col_type,
                    'nullable': 'NOT NULL' not in line.upper(),
                    'default': self._extract_default(line),
                    'constraints': self._extract_column_constraints(line)
                }
        
        return columns
    
    def _parse_constraints(self, columns_sql: str) -> List[Dict]:
        """Parse table constraints"""
        constraints = []
        constraint_pattern = r'CONSTRAINT\s+(\w+)\s+(.*?)(?=,|$)'
        
        for match in re.finditer(constraint_pattern, columns_sql, re.IGNORECASE):
            constraints.append({
                'name': match.group(1),
                'definition': match.group(2).strip()
            })
        
        return constraints
    
    def _extract_indexes(self, content: str, table_name: str) -> List[Dict]:
        """Extract indexes for a table"""
        index_pattern = rf'CREATE\s+(?:UNIQUE\s+)?INDEX\s+(\w+)\s+ON\s+{table_name}\s*\((.*?)\)'
        indexes = []
        
        for match in re.finditer(index_pattern, content, re.IGNORECASE):
            indexes.append({
                'name': match.group(1),
                'columns': [col.strip() for col in match.group(2).split(',')],
                'unique': 'UNIQUE' in match.group(0).upper()
            })
        
        return indexes
    
    def _extract_default(self, line: str) -> str:
        """Extract default value from column definition"""
        default_match = re.search(r'DEFAULT\s+([^,\s]+)', line, re.IGNORECASE)
        return default_match.group(1) if default_match else None
    
    def _extract_column_constraints(self, line: str) -> List[str]:
        """Extract column-level constraints"""
        constraints = []
        if 'PRIMARY KEY' in line.upper():
            constraints.append('PRIMARY KEY')
        if 'UNIQUE' in line.upper():
            constraints.append('UNIQUE')
        if 'NOT NULL' in line.upper():
            constraints.append('NOT NULL')
        return constraints
    
    def _extract_functions(self, content: str) -> List[Dict]:
        """Extract function definitions"""
        func_pattern = r'CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(\w+)\((.*?)\)'
        functions = []
        
        for match in re.finditer(func_pattern, content, re.IGNORECASE):
            functions.append({
                'name': match.group(1),
                'parameters': match.group(2)
            })
        
        return functions
    
    def _extract_triggers(self, content: str) -> List[Dict]:
        """Extract trigger definitions"""
        trigger_pattern = r'CREATE\s+TRIGGER\s+(\w+)'
        triggers = []
        
        for match in re.finditer(trigger_pattern, content, re.IGNORECASE):
            triggers.append({'name': match.group(1)})
        
        return triggers
    
    def _extract_types(self, content: str) -> List[Dict]:
        """Extract custom type definitions"""
        type_pattern = r'CREATE\s+TYPE\s+(\w+)'
        types = []
        
        for match in re.finditer(type_pattern, content, re.IGNORECASE):
            types.append({'name': match.group(1)})
        
        return types

class MigrationSurgeon:
    """Performs surgical migration operations"""
    
    def __init__(self):
        self.analyzer = SchemaDNAAnalyzer()
        
    def diagnose_changes(self, old_schema: str, new_schema: str) -> List[SchemaChange]:
        """Diagnose schema mutations between versions"""
        old_dna = self.analyzer.extract_schema_dna(old_schema)
        new_dna = self.analyzer.extract_schema_dna(new_schema)
        
        changes = []
        
        # Analyze table changes
        changes.extend(self._analyze_table_changes(old_dna['tables'], new_dna['tables']))
        
        # Analyze function changes
        changes.extend(self._analyze_function_changes(old_dna['functions'], new_dna['functions']))
        
        return changes
    
    def _analyze_table_changes(self, old_tables: Dict, new_tables: Dict) -> List[SchemaChange]:
        """Analyze changes in table structure"""
        changes = []
        
        # New tables
        for table_name in new_tables.keys() - old_tables.keys():
            changes.append(SchemaChange(
                change_type='ADD_TABLE',
                table_name=table_name,
                details={'table_def': new_tables[table_name]},
                risk_level='MEDIUM',
                rollback_sql=f'DROP TABLE IF EXISTS {table_name};'
            ))
        
        # Dropped tables
        for table_name in old_tables.keys() - new_tables.keys():
            risk = 'CRITICAL' if table_name in self.analyzer.critical_tables else 'HIGH'
            changes.append(SchemaChange(
                change_type='DROP_TABLE',
                table_name=table_name,
                details={'table_def': old_tables[table_name]},
                risk_level=risk,
                rollback_sql=self._generate_create_table_sql(table_name, old_tables[table_name])
            ))
        
        # Modified tables
        for table_name in old_tables.keys() & new_tables.keys():
            table_changes = self._analyze_column_changes(
                table_name, 
                old_tables[table_name]['columns'],
                new_tables[table_name]['columns']
            )
            changes.extend(table_changes)
        
        return changes
    
    def _analyze_column_changes(self, table_name: str, old_cols: Dict, new_cols: Dict) -> List[SchemaChange]:
        """Analyze column-level changes"""
        changes = []
        
        # New columns
        for col_name in new_cols.keys() - old_cols.keys():
            changes.append(SchemaChange(
                change_type='ADD_COLUMN',
                table_name=table_name,
                details={'column': col_name, 'definition': new_cols[col_name]},
                risk_level='LOW',
                rollback_sql=f'ALTER TABLE {table_name} DROP COLUMN {col_name};'
            ))
        
        # Dropped columns
        for col_name in old_cols.keys() - new_cols.keys():
            risk = 'CRITICAL' if table_name in self.analyzer.critical_tables else 'MEDIUM'
            changes.append(SchemaChange(
                change_type='DROP_COLUMN',
                table_name=table_name,
                details={'column': col_name, 'definition': old_cols[col_name]},
                risk_level=risk,
                rollback_sql=self._generate_add_column_sql(table_name, col_name, old_cols[col_name])
            ))
        
        # Modified columns
        for col_name in old_cols.keys() & new_cols.keys():
            if old_cols[col_name] != new_cols[col_name]:
                changes.append(SchemaChange(
                    change_type='MODIFY_COLUMN',
                    table_name=table_name,
                    details={
                        'column': col_name,
                        'old_def': old_cols[col_name],
                        'new_def': new_cols[col_name]
                    },
                    risk_level='MEDIUM',
                    rollback_sql=self._generate_modify_column_sql(table_name, col_name, old_cols[col_name])
                ))
        
        return changes
    
    def _analyze_function_changes(self, old_funcs: List, new_funcs: List) -> List[SchemaChange]:
        """Analyze function changes"""
        changes = []
        old_func_names = {f['name'] for f in old_funcs}
        new_func_names = {f['name'] for f in new_funcs}
        
        # New functions
        for func_name in new_func_names - old_func_names:
            changes.append(SchemaChange(
                change_type='ADD_FUNCTION',
                table_name='',
                details={'function': func_name},
                risk_level='LOW',
                rollback_sql=f'DROP FUNCTION IF EXISTS {func_name};'
            ))
        
        return changes
    
    def _generate_create_table_sql(self, table_name: str, table_def: Dict) -> str:
        """Generate CREATE TABLE SQL from definition"""
        columns_sql = []
        
        for col_name, col_def in table_def['columns'].items():
            col_sql = f'{col_name} {col_def["type"]}'
            
            if not col_def['nullable']:
                col_sql += ' NOT NULL'
            
            if col_def['default']:
                col_sql += f' DEFAULT {col_def["default"]}'
            
            columns_sql.append(col_sql)
        
        return f'CREATE TABLE {table_name} ({", ".join(columns_sql)});'
    
    def _generate_add_column_sql(self, table_name: str, col_name: str, col_def: Dict) -> str:
        """Generate ADD COLUMN SQL"""
        col_sql = f'{col_name} {col_def["type"]}'
        
        if not col_def['nullable']:
            col_sql += ' NOT NULL'
        
        if col_def['default']:
            col_sql += f' DEFAULT {col_def["default"]}'
        
        return f'ALTER TABLE {table_name} ADD COLUMN {col_sql};'
    
    def _generate_modify_column_sql(self, table_name: str, col_name: str, col_def: Dict) -> str:
        """Generate ALTER COLUMN SQL"""
        return f'ALTER TABLE {table_name} ALTER COLUMN {col_name} TYPE {col_def["type"]};'
    
    def generate_migration(self, changes: List[SchemaChange], migration_name: str) -> str:
        """Generate complete migration script"""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        
        migration_sql = f"""-- OncoVista Schema Migration: {migration_name}
-- Generated: {datetime.now().isoformat()}
-- Migration ID: {timestamp}_{migration_name}

-- 🔬 CRITICAL: Review all changes before execution
-- 🩺 Risk Assessment:"""
        
        risk_summary = {}
        for change in changes:
            risk_summary[change.risk_level] = risk_summary.get(change.risk_level, 0) + 1
        
        for risk, count in risk_summary.items():
            migration_sql += f"\n--   {risk}: {count} changes"
        
        migration_sql += "\n\n-- Begin Transaction (Surgical Precision)\nBEGIN;\n\n"
        
        # Sort changes by risk level and dependencies
        sorted_changes = self._sort_changes_by_risk(changes)
        
        for i, change in enumerate(sorted_changes, 1):
            migration_sql += f"-- Operation {i}: {change.change_type} on {change.table_name or 'GLOBAL'}\n"
            migration_sql += f"-- Risk Level: {change.risk_level}\n"
            migration_sql += self._generate_change_sql(change)
            migration_sql += "\n\n"
        
        migration_sql += "-- Commit Transaction (Patient Stable)\nCOMMIT;\n"
        
        return migration_sql
    
    def _sort_changes_by_risk(self, changes: List[SchemaChange]) -> List[SchemaChange]:
        """Sort changes by risk level and dependencies"""
        risk_order = {'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'CRITICAL': 4}
        
        # First, group by operation type for dependency ordering
        operation_order = {
            'ADD_TABLE': 1,
            'ADD_COLUMN': 2,
            'MODIFY_COLUMN': 3,
            'ADD_FUNCTION': 4,
            'DROP_COLUMN': 5,
            'DROP_TABLE': 6
        }
        
        return sorted(changes, key=lambda x: (operation_order.get(x.change_type, 999), risk_order.get(x.risk_level, 999)))
    
    def _generate_change_sql(self, change: SchemaChange) -> str:
        """Generate SQL for a specific change"""
        if change.change_type == 'ADD_TABLE':
            return self._generate_create_table_sql(change.table_name, change.details['table_def'])
        elif change.change_type == 'ADD_COLUMN':
            return self._generate_add_column_sql(
                change.table_name, 
                change.details['column'], 
                change.details['definition']
            )
        elif change.change_type == 'DROP_TABLE':
            return f'DROP TABLE IF EXISTS {change.table_name};'
        elif change.change_type == 'DROP_COLUMN':
            return f'ALTER TABLE {change.table_name} DROP COLUMN {change.details["column"]};'
        elif change.change_type == 'MODIFY_COLUMN':
            return self._generate_modify_column_sql(
                change.table_name,
                change.details['column'],
                change.details['new_def']
            )
        else:
            return f'-- TODO: Implement {change.change_type} operation'
    
    def generate_rollback_script(self, changes: List[SchemaChange]) -> str:
        """Generate rollback script for emergency recovery"""
        rollback_sql = f"""-- OncoVista Emergency Rollback Script
-- Generated: {datetime.now().isoformat()}
-- 🚨 EMERGENCY USE ONLY - Reverts schema changes

-- Begin Emergency Transaction
BEGIN;

"""
        
        # Reverse the order for rollback
        for change in reversed(changes):
            rollback_sql += f"-- Rollback: {change.change_type} on {change.table_name}\n"
            rollback_sql += change.rollback_sql + "\n\n"
        
        rollback_sql += "-- Commit Rollback (Patient Stabilized)\nCOMMIT;\n"
        
        return rollback_sql

def main():
    """Main execution function"""
    if len(sys.argv) != 4:
        print("Usage: migration_generator.py <old_schema.sql> <new_schema.sql> <migration_name>")
        sys.exit(1)
    
    old_schema_file = sys.argv[1]
    new_schema_file = sys.argv[2]
    migration_name = sys.argv[3]
    
    surgeon = MigrationSurgeon()
    
    print("🔬 Analyzing schema DNA...")
    changes = surgeon.diagnose_changes(old_schema_file, new_schema_file)
    
    if not changes:
        print("✅ No schema mutations detected. Patient is stable.")
        return
    
    print(f"🧬 Detected {len(changes)} schema mutations:")
    for change in changes:
        risk_emoji = {
            'LOW': '🟢',
            'MEDIUM': '🟡', 
            'HIGH': '🟠',
            'CRITICAL': '🔴'
        }
        print(f"  {risk_emoji.get(change.risk_level, '⚪')} {change.change_type} on {change.table_name} [{change.risk_level}]")
    
    print("\n💉 Generating migration script...")
    migration_sql = surgeon.generate_migration(changes, migration_name)
    
    # Write migration file
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    migration_file = f"migrations/{timestamp}_{migration_name}.sql"
    Path("migrations").mkdir(exist_ok=True)
    
    with open(migration_file, 'w') as f:
        f.write(migration_sql)
    
    print(f"✅ Migration script saved: {migration_file}")
    
    # Generate rollback script
    print("\n🩹 Generating rollback script...")
    rollback_sql = surgeon.generate_rollback_script(changes)
    rollback_file = f"migrations/{timestamp}_{migration_name}_ROLLBACK.sql"
    
    with open(rollback_file, 'w') as f:
        f.write(rollback_sql)
    
    print(f"✅ Rollback script saved: {rollback_file}")
    
    # Risk assessment
    critical_changes = [c for c in changes if c.risk_level == 'CRITICAL']
    if critical_changes:
        print(f"\n🚨 WARNING: {len(critical_changes)} CRITICAL changes detected!")
        print("   Manual review required before execution.")
    
    print("\n🧟 Schema evolution complete. Ready for resurrection.")

if __name__ == "__main__":
    main()
