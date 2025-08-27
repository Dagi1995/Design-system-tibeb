// design-system/src/stories/organisms/DetailPage.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../components/atoms/Button";
import { TooltipProvider } from "../../components/atoms/Tooltip";
import { DetailPage } from "../../components/organisms/DetailPage";

interface BaseField {
  name: string;
  label: string;
  tooltip?: string;
}

interface InputField extends BaseField {
  type: "input";
  defaultValue?: string;
  required?: boolean;
}

interface NumberField extends BaseField {
  type: "number";
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
  defaultValue?: boolean;
}

interface SelectField extends BaseField {
  type: "select";
  options: string[];
  defaultValue?: string;
  addable?: boolean;
}

interface CustomField extends BaseField {
  type: "custom";
  component: React.ReactNode;
}

type Field =
  | InputField
  | NumberField
  | CheckboxField
  | SelectField
  | CustomField;

interface CollapsibleGroup {
  title: string;
  fields: Field[];
}

interface Section {
  title: string;
  columns?: 1 | 2 | 3 | 4;
  collapsible?: boolean;
  fields: Field[];
  collapsibleGroups?: CollapsibleGroup[];
}

interface TabConfig {
  id: string;
  label: string;
  sections: Section[];
}

const meta: Meta<typeof DetailPage> = {
  title: "Design-system/Components/Organisms/DetailPage",
  component: DetailPage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The `DetailPage` component is a dynamic form builder with support for tabs, collapsible sections, fields, and even custom React components. Below are different usage examples.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailPage>;

/* --------------------------------
   1. Minimal Example
-------------------------------- */
export const Minimal: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "basic",
        label: "Basic",
        sections: [
          {
            title: "Basic Info",
            columns: 2,
            fields: [
              {
                type: "input",
                name: "name",
                label: "Product Name",
                defaultValue: "Sample Product",
              },
              {
                type: "checkbox",
                name: "isActive",
                label: "Is Active?",
                defaultValue: true,
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Minimal Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   2. Collapsible Section with Groups
-------------------------------- */
export const CollapsibleWithGroups: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "general",
        label: "General",
        sections: [
          {
            title: "General Settings",
            collapsible: true,
            columns: 2,
            fields: [
              {
                type: "input",
                name: "title",
                label: "Title",
                defaultValue: "Super Widget",
              },
              {
                type: "select",
                name: "category",
                label: "Category",
                options: ["Electronics", "Furniture", "Toys"],
              },
            ],
            collapsibleGroups: [
              {
                title: "Advanced Settings",
                fields: [
                  {
                    type: "number",
                    name: "price",
                    label: "Price",
                    defaultValue: 199,
                  },
                  {
                    type: "checkbox",
                    name: "discount",
                    label: "Allow Discount?",
                    defaultValue: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Collapsible Section + Groups"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   3. Non-Collapsible Section with Groups
-------------------------------- */
export const NonCollapsibleWithGroups: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "inventory",
        label: "Inventory",
        sections: [
          {
            title: "Stock Info (Always Open)",
            collapsible: false,
            columns: 2,
            fields: [
              {
                type: "number",
                name: "minQty",
                label: "Minimum Qty",
                defaultValue: 1,
              },
              {
                type: "number",
                name: "maxQty",
                label: "Maximum Qty",
                defaultValue: 500,
              },
            ],
            collapsibleGroups: [
              {
                title: "Warehouse Settings",
                fields: [
                  {
                    type: "checkbox",
                    name: "trackStock",
                    label: "Track Stock?",
                    defaultValue: true,
                  },
                  {
                    type: "checkbox",
                    name: "backOrder",
                    label: "Allow Back Order?",
                    defaultValue: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Non-Collapsible Section + Groups"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   4. With Custom Component Field
-------------------------------- */
export const WithCustomComponent: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "custom",
        label: "Custom",
        sections: [
          {
            title: "Custom Fields",
            columns: 1,
            fields: [
              {
                type: "custom",
                name: "extraInfo",
                label: "Extra Info",
                component: (
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Custom Component</h3>
                    <p className="text-sm text-muted-foreground">
                      You can inject any React component here.
                    </p>
                    <Button size="sm" variant="secondary">
                      Click Me
                    </Button>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Custom Component Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};
/* --------------------------------
   5. Three Column Layout
-------------------------------- */
export const ThreeColumns: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "layout3",
        label: "3-Column",
        sections: [
          {
            title: "Three Column Form",
            columns: 3,
            fields: [
              {
                type: "input",
                name: "firstName",
                label: "First Name",
                defaultValue: "John",
              },
              {
                type: "input",
                name: "lastName",
                label: "Last Name",
                defaultValue: "Doe",
              },
              {
                type: "number",
                name: "age",
                label: "Age",
                defaultValue: 30,
              },
              {
                type: "select",
                name: "gender",
                label: "Gender",
                options: ["Male", "Female", "Other"],
              },
              {
                type: "checkbox",
                name: "subscribe",
                label: "Subscribe to Newsletter?",
                defaultValue: true,
              },
              {
                type: "input",
                name: "city",
                label: "City",
                defaultValue: "New York",
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Three Column Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

/* --------------------------------
   6. Four Column Layout
-------------------------------- */
export const FourColumns: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "layout4",
        label: "4-Column",
        sections: [
          {
            title: "Four Column Form",
            columns: 4,
            fields: [
              {
                type: "input",
                name: "col1",
                label: "Column 1",
              },
              {
                type: "input",
                name: "col2",
                label: "Column 2",
              },
              {
                type: "input",
                name: "col3",
                label: "Column 3",
              },
              {
                type: "input",
                name: "col4",
                label: "Column 4",
              },
              {
                type: "number",
                name: "budget",
                label: "Budget",
              },
              {
                type: "checkbox",
                name: "approved",
                label: "Approved?",
              },
              {
                type: "select",
                name: "priority",
                label: "Priority",
                options: ["Low", "Medium", "High"],
                addable: true,
              },
              {
                type: "custom",
                name: "customNote",
                label: "Note",
                component: (
                  <div className="text-xs text-muted-foreground">
                    Custom content
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Four Column Example"
          tabs={tabs}
          onSave={(data) => console.log("Save:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};
