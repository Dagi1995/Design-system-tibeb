import { useMemo } from "react";
import { Label } from "../atoms/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../molecules/Chart";
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
  ResponsiveContainer,
} from "recharts";
import { Button } from "../atoms/Button";

// Extended types for better customization
type ThemeType = 'light' | 'dark' | 'blue' | 'green' | string;
type SizeType = 'sm' | 'md' | 'lg';
type WorkspaceType = 'Text' | 'Chart' | 'Link' | 'Shortcut' | 'QuickList' | 'Cards' | 'Stats';

interface WorkspaceTypeConfig {
  type: WorkspaceType;
  name: string;
  description?: string;
  value: any;
  span?: number;
  height?: string;
  className?: string;
  backgroundColor?: string;
  borderRadius?: string;
}

interface WorkspaceSection {
  title?: string;
  description?: string;
  contents: WorkspaceTypeConfig[];
  columns?: number;
  gap?: SizeType;
}

interface Workspace {
  name: string;
  description: string;
  sections: WorkspaceSection[];
  theme?: ThemeType;
  className?: string;
}

// Theme configurations
const themeConfig = {
  light: {
    background: 'bg-gray-50',
    text: 'text-gray-900',
    cardBg: 'bg-white',
    border: 'border-gray-200',
    shadow: 'shadow-sm',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    cardBg: 'bg-gray-800',
    border: 'border-gray-700',
    shadow: 'shadow-md shadow-gray-900/50',
  },
  blue: {
    background: 'bg-blue-50',
    text: 'text-blue-900',
    cardBg: 'bg-white',
    border: 'border-blue-200',
    shadow: 'shadow-sm shadow-blue-200/50',
  },
  green: {
    background: 'bg-green-50',
    text: 'text-green-900',
    cardBg: 'bg-white',
    border: 'border-green-200',
    shadow: 'shadow-sm shadow-green-200/50',
  },
};

export const Workspace: React.FC<Workspace> = ({
  name,
  description,
  sections,
  theme = 'light',
  className = '',
}) => {
  // Get theme styles
  const currentTheme = themeConfig[theme as keyof typeof themeConfig] || themeConfig.light;

  // Memoize column classes for performance
  const getColumnClasses = useMemo(() => (columns?: number) => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  }, []);

  // Memoize gap classes
  const getGapClasses = useMemo(() => (gap?: SizeType) => {
    switch (gap) {
      case 'sm': return 'gap-4';
      case 'md': return 'gap-6';
      case 'lg': return 'gap-8';
      default: return 'gap-6';
    }
  }, []);

  return (
    <div className={`space-y-8 p-6 min-h-screen ${currentTheme.background} ${className}`}>
      <div className="mb-6">
        <Label className={`text-2xl font-bold ${currentTheme.text}`}>{name}</Label>
        {description && (
          <p className={`text-gray-600 mt-2 ${theme === 'dark' ? 'text-gray-400' : ''}`}>
            {description}
          </p>
        )}
      </div>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          {section.title && (
            <div className="mb-4">
              <Label className={`text-xl font-semibold ${currentTheme.text}`}>
                {section.title}
              </Label>
              {section.description && (
                <p className={`text-gray-600 mt-1 ${theme === 'dark' ? 'text-gray-400' : ''}`}>
                  {section.description}
                </p>
              )}
            </div>
          )}

          <div className={`grid ${getColumnClasses(section.columns)} ${getGapClasses(section.gap)}`}>
            {section.contents.map((content, contentIndex) => {
              const spanClasses = content.span
                ? `col-span-${Math.min(content.span, section.columns || 3)}`
                : `col-span-${section.columns || 3}`; // Default to full width

              return (
                <div
                  key={contentIndex}
                  className={`${spanClasses} ${content.className || ''}`}
                  style={{
                    height: content.height,
                    backgroundColor: content.backgroundColor,
                    borderRadius: content.borderRadius,
                  }}
                >
                  {content.type === 'Text' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}>
                      <CardContent className="p-4">
                        <Label className={`font-semibold mb-2 ${currentTheme.text}`}>
                          {content.name}
                        </Label>
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {content.value}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'Chart' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}>
                      <CardHeader>
                        <CardTitle className={currentTheme.text}>{content.name}</CardTitle>
                        {content.description && (
                          <CardDescription
                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                          >
                            {content.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div style={{ minHeight: content.height || '250px' }}>
                          <ChartContainer config={content.value.config}>
                            <ResponsiveContainer width="100%" height="100%">
                              {content.value.type === 'LineChart' && (
                                <LineChart
                                  data={content.value.data}
                                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                  width={undefined}
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
                                  width={undefined}
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
                                <PieChart width={undefined}>
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
                                        fill={
                                          content.value.config[entry.name.toLowerCase()]?.color ||
                                          '#8884d8'
                                        }
                                      />
                                    ))}
                                  </Pie>
                                </PieChart>
                              )}
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'Shortcut' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow} hover:bg-opacity-80 cursor-pointer`}>
                      <CardContent className="p-4">
                        <Label className={`font-semibold ${currentTheme.text}`}>
                          {content.name}
                        </Label>
                        {content.description && (
                          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {content.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'QuickList' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}>
                      <CardHeader>
                        <CardTitle className={currentTheme.text}>{content.name}</CardTitle>
                        {content.description && (
                          <CardDescription
                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                          >
                            {content.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="space-y-2">
                          {Array.isArray(content.value) &&
                            content.value.map((item, idx) => (
                              <li
                                key={idx}
                                className={`flex items-center p-2 hover:bg-opacity-80 rounded-md ${
                                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                                }`}
                              >
                                <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {typeof item === 'object' ? item.name : item}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'Cards' && (
                    <Card
                      className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}
                      style={{ minHeight: content.height || '350px' }}
                    >
                      <CardHeader>
                        <CardTitle className={currentTheme.text}>{content.name}</CardTitle>
                        {content.description && (
                          <CardDescription
                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                          >
                            {content.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3 p-4">
                        {Array.isArray(content.value) &&
                          content.value.map((card, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-md ${
                                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                              }`}
                            >
                              {typeof card === 'object' ? card.content : card}
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'Stats' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}>
                      <CardContent className="text-center p-4">
                        <div className="text-2xl font-bold text-blue-500">
                          {content.value.label}
                        </div>
                        <div
                          className={`text-xl ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          {content.value.value}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {content.type === 'Link' && (
                    <Card className={`${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}>
                      <CardHeader>
                        <CardTitle className={currentTheme.text}>{content.name}</CardTitle>
                        {content.description && (
                          <CardDescription
                            className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                          >
                            {content.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col gap-4">
                        {content.value.map((link: any, index: number) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2 hover:bg-opacity-80 hover:cursor-pointer"
                          >
                            <Label className={currentTheme.text}>{link.name}</Label>
                            <Button size="sm" variant="secondary" className={`text-green-400 ${currentTheme.text}`}>
                              {link.status}
                            </Button>
                          </a>
                        ))}
                        <Button variant="outline" onClick={() => console.log('Link clicked')}>
                          View All
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};