import { Card, CardHeader, CardTitle, CardContent, Badge } from "./ui";
import ActionPill from "./ActionPill";
import type { ComponentType } from "react";

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description?: string;
  href: string;
  icon: ComponentType<any>;
}) {
  return (
    <Card className="border-l-4 border-l-orange-600">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-orange-600" />
            <span className="truncate">{title}</span>
          </span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">tool</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {description ? (
          <p className="line-clamp-2"
             style={{ display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {description}
          </p>
        ) : <p className="sr-only">Open {title}</p>}
        <div className="mt-3">
          <ActionPill label="Open" to={href} />
        </div>
      </CardContent>
    </Card>
  );
}
