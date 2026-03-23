import { type SchemaTypeDefinition } from "sanity";
import { articleCategoryType } from "./articleCategoryType";
import { articlesSectionType } from "./articlesSectionType";
import { articleType } from "./articleType";
import { heroType } from "./heroType";
import { homePageType } from "./homePageType";
import { navBarType } from "./navbarType";
import { navigationItemType } from "./navigationItemType";
import { pageConfig } from "./pageConfig";
import { footerLinksGroup } from "./FooterLinksGroup";
import { footer } from "./Footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    articleType,
    articleCategoryType,
    homePageType,
    heroType,
    pageConfig,
    navBarType,
    navigationItemType,
    articlesSectionType,
    footerLinksGroup,
    footer,
  ],
};
