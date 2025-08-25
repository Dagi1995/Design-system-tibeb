import { Label } from "../atoms/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molocules/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../molocules/Chart";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

type WorkspaceType = 'Text' | 'Chart' | 'Link' | 'Shortcut' | 'QuickList' | 'Cards' | 'Column';

interface WorkspaceContent {
  type: WorkspaceType;
  name: string;
  description: string;
  value: any;
}

interface WorkspaceSection {
  contents: WorkspaceContent[];
}

interface Workspace {
  name: string;
  description: string;
  sections: WorkspaceSection[];
}

export const Workspace: React.FC<Workspace> = ({ name, description, sections }) => {
  return (
    <div className="space-y-8">
      <Label size="lg">{name}</Label>
      {sections.map((section, sectionIndex) => {
        // Count the number of Column items to determine grid columns
        const columnCount = 1 + section.contents.filter(content => content.type === 'Column').length;
        
        return (
          <div key={sectionIndex} className="mb-12">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
            >
              {section.contents.map((content, contentIndex) => (
                content.type === 'Column' ? null : (
                  <div key={contentIndex} className="min-w-0">
                    {content.type === 'Text' ? (
                      <Label size="lg">{content.name}</Label>
                    ) : content.type === 'Chart' ? (
                      <ChartContainer config={content.value.config}>
                        {content.value.type === 'LineChart' && (
                          <LineChart data={content.value.data} width={500} height={300}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Line
                              type="monotone"
                              dataKey="sales"
                              stroke={`var(--color-sales)`}
                            />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke={`var(--color-revenue)`}
                            />
                          </LineChart>
                        )}
                        {content.value.type === 'BarChart' && (
                          <BarChart data={content.value.data} width={500} height={300}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="sales" fill={`var(--color-sales)`} />
                            <Bar dataKey="revenue" fill={`var(--color-revenue)`} />
                          </BarChart>
                        )}
                        {content.value.type === 'PieChart' && (
                          <PieChart width={500} height={300}>
                            <ChartTooltip  content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Pie 
                              data={content.value.data} 
                              dataKey="value" 
                              nameKey="name" 
                              cx="50%" 
                              cy="50%" 
                              outerRadius={100}
                            >
                              {content.value.data.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={content.value.config[entry.name]?.color || "#8884d8"} />
                              ))}
                            </Pie>
                          </PieChart>
                        )}
                      </ChartContainer>
                    ) : content.type === 'Link' ? (
                      <Label size="lg">{content.name}</Label>
                    ) : content.type === 'Shortcut' ? (
                      <Label>{content.name}</Label>
                    ) : content.type === 'QuickList' ? (
                      <Label>{content.name}</Label>
                    ) : content.type === 'Cards' ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>{content.name}</CardTitle>
                          <CardDescription>{content.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {content.value.map((card, index) => (
                             <CardContent key={index}>{card}</CardContent>
                          ))}
                        </CardContent>
                      </Card>
                    ) : null}
                  </div>
                )
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};