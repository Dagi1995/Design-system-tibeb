// components/DetailPage.stories.tsx
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
};

export default meta;

type Story = StoryObj<typeof DetailPage>;

// ✅ Coffee example
export const CoffeeProductDetailPage: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "coffee",
        label: "Coffee Info",
        sections: [
          {
            title: "Basic Information",
            columns: 2,
            fields: [
              {
                type: "input",
                name: "coffeeName",
                label: "Coffee Name",
                defaultValue: "Ethiopian Yirgacheffe",
                required: true,
              },
              {
                type: "select",
                name: "grade",
                label: "Grade",
                options: ["G1", "G2", "G3"],
                defaultValue: "G1",
              },
            ],
          },
        ],
      },
    ];

    return (
      <TooltipProvider>
        <DetailPage
          title="Coffee-G1 Product Details"
          tabs={tabs}
          onSave={(data) => console.log("Saving data:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};

// ✅ All Features Story (with nested collapsible)
export const AllFeatures: Story = {
  render: () => {
    const tabs: TabConfig[] = [
      {
        id: "general",
        label: "General",
        sections: [
          {
            title: "Basic Info",
            collapsible: true,
            columns: 2,
            fields: [
              {
                type: "input",
                name: "productName",
                label: "Product Name",
                defaultValue: "Super Widget",
                required: true,
              },
              {
                type: "select",
                name: "category",
                label: "Category",
                options: ["Electronics", "Furniture", "Toys"],
                defaultValue: "Electronics",
                addable: true,
              },
              {
                type: "checkbox",
                name: "isActive",
                label: "Is Active?",
                defaultValue: true,
              },
            ],
            collapsibleGroups: [
              {
                title: "Advanced Settings (Nested Collapsible)",
                fields: [
                  {
                    type: "number",
                    name: "minQty",
                    label: "Minimum Quantity",
                    defaultValue: 1,
                    min: 0,
                    tooltip: "Lowest allowed purchase quantity",
                  },
                  {
                    type: "number",
                    name: "maxQty",
                    label: "Maximum Quantity",
                    defaultValue: 100,
                    min: 1,
                    max: 1000,
                    tooltip: "Highest allowed purchase quantity",
                  },
                  {
                    type: "number",
                    name: "price",
                    label: "Price",
                    defaultValue: 299.99,
                    min: 0,
                    step: 0.01,
                  },
                  {
                    type: "checkbox",
                    name: "allowDiscount",
                    label: "Allow Discount",
                    defaultValue: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "custom",
        label: "Custom Components",
        sections: [
          {
            title: "Custom Fields",
            collapsible: true,
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
                    <Button variant="secondary" size="sm">
                      Do Something
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
          title="All Features Demo"
          tabs={tabs}
          onSave={(data) => console.log("Saving data:", data)}
          onCancel={() => console.log("Cancelled")}
        />
      </TooltipProvider>
    );
  },
};
