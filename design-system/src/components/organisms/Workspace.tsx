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
  YAxis,
  ResponsiveContainer
} from "recharts";

type WorkspaceType = 'Text' | 'Chart' | 'Link' | 'Shortcut' | 'QuickList' | 'Cards' | 'Column' | 'Stats';

interface WorkspaceContent {
  type: WorkspaceType;
  name: string;
  description?: string;
  value: any;
}

interface WorkspaceSection {
  title?: string;
  description?: string;
  contents: WorkspaceContent[];
}

interface Workspace {
  name: string;
  description: string;
  sections: WorkspaceSection[];
}

export const Workspace: React.FC<Workspace> = ({ name, description, sections }) => {
  return (
    <div className="space-y-8 p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Label size="lg" className="text-2xl font-bold">{name}</Label>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      
      {sections.map((section, sectionIndex) => {
        // Group contents by columns
        const columnGroups: WorkspaceContent[][] = [];
        let currentColumn: WorkspaceContent[] = [];
        
        section.contents.forEach(content => {
          if (content.type === 'Column') {
            if (currentColumn.length > 0) {
              columnGroups.push([...currentColumn]);
              currentColumn = [];
            }
          } else {
            currentColumn.push(content);
          }
        });
        
        // Add the last column if it has contents
        if (currentColumn.length > 0) {
          columnGroups.push([...currentColumn]);
        }
        
        return (
          <div key={sectionIndex} className="mb-8">
            {section.title && (
              <div className="mb-4">
                <Label size="md" className="text-xl font-semibold">{section.title}</Label>
                {section.description && <p className="text-gray-600 mt-1">{section.description}</p>}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {columnGroups.map((columnContents, columnIndex) => (
                <div key={columnIndex} className="space-y-6">
                  {columnContents.map((content, contentIndex) => (
                    <div key={contentIndex} className="">
                      {content.type === 'Text' ? (
                        <div>
                          <Label size="md" className="font-semibold mb-2">{content.name}</Label>
                          <p className="text-gray-700">{content.value}</p>
                        </div>
                      ) : content.type === 'Chart' ? (
                        <div className="bg-white  shadow-gray-400 min-h-[350px] shadow-sm rounded-lg p-4">
                          <Label size="md" className="font-semibold mb-4 block">{content.name}</Label>
                          <div className="h-64">
                            <ChartContainer config={content.value.config}>
                              <ResponsiveContainer width="100%" height="100%">
                                {content.value.type === 'LineChart' && (
                                  <LineChart 
                                    data={content.value.data} 
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    {Object.keys(content.value.config).map((key) => (
                                      <Line
                                        key={key}
                                        type="monotone"
                                        dataKey={key}
                                        stroke={content.value.config[key].color}
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                      />
                                    ))}
                                  </LineChart>
                                )}
                                {content.value.type === 'BarChart' && (
                                  <BarChart 
                                    data={content.value.data} 
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    {Object.keys(content.value.config).map((key) => (
                                      <Bar 
                                        key={key} 
                                        dataKey={key} 
                                        fill={content.value.config[key].color} 
                                      />
                                    ))}
                                  </BarChart>
                                )}
                                {content.value.type === 'PieChart' && (
                                  <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Pie 
                                      data={content.value.data} 
                                      dataKey="value" 
                                      nameKey="name" 
                                      cx="50%" 
                                      cy="50%" 
                                      outerRadius={80}
                                      label
                                    >
                                      {content.value.data.map((entry: any, index: number) => (
                                        <Cell 
                                          key={`cell-${index}`} 
                                          fill={content.value.config[entry.name.toLowerCase()]?.color || "#8884d8"} 
                                        />
                                      ))}
                                    </Pie>
                                  </PieChart>
                                )}
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </div>
                      ) : content.type === 'Shortcut' ? (
                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-md border border-gray-200">
                          <Label size="md" className="font-semibold">{content.name}</Label>
                          {content.description && <p className="text-gray-600 text-sm mt-1">{content.description}</p>}
                          {Array.isArray(content.value) && content.value.map((item: any, index: number) => (
                            <p key={index} className="text-gray-600 text-sm mt-1">{item.description}</p>
                          ))}
                        </button>
                      ) : content.type === 'QuickList' ? (
                        <div className="bg-white  shadow-gray-400 min-h-[350px] shadow-sm rounded-lg p-4">
                          <Label size="md" className="font-semibold mb-3 block">{content.name}</Label>
                          <ul className="space-y-2">
                            {Array.isArray(content.value) && content.value.map((item, idx) => (
                              <li key={idx} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                                <span className="ml-2">{typeof item === 'object' ? item.name : item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : content.type === 'Cards' ? (
                        <Card className="min-h-[350px]">
                          <CardHeader>
                            <CardTitle>{content.name}</CardTitle>
                            {content.description && <CardDescription>{content.description}</CardDescription>}
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {Array.isArray(content.value) && content.value.map((card, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-md">
                                {typeof card === 'object' ? card.content : card}
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ) : content.type === 'Stats' ? (
                        <div className="bg-white shadow-sm rounded-lg">
                              <div  className="text-center p-3">
                                <div className="text-2xl font-bold text-blue-500">{content.value.label}</div>
                                <div className="text-xl text-gray-500">{content.value.value}</div>
                              </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};