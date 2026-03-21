import { standardCatalog } from "@a2ui-sdk/react/0.9";
import type { Catalog } from "@a2ui-sdk/react/0.9";
import { RuleCard } from "./RuleCard";
import { ComparisonTable } from "./ComparisonTable";
import { StepByStep } from "./StepByStep";
import { QuickReference } from "./QuickReference";
import { SetupChecklist } from "./SetupChecklist";
import { RulebookScreenshot } from "./RulebookScreenshot";

export const customCatalog: Catalog = {
  ...standardCatalog,
  components: {
    ...standardCatalog.components,
    RuleCard,
    ComparisonTable,
    StepByStep,
    QuickReference,
    SetupChecklist,
    RulebookScreenshot,
  },
};
