import { type SchemaTypeDefinition } from 'sanity'
import { articleCategoryType } from './articleCategoryType'
import { articlesSectionType } from './articlesSectionType'
import { articleType } from './articleType'
import { heroType } from './heroType'
import { homePageType } from './homePageType'
import { navBarType } from './navbarType'
import { navigationItemType } from './navigationItemType'
import { pageConfig } from './pageConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
      articleType,
      homePageType,
      heroType,
      articleCategoryType,
      pageConfig,
      navBarType,
      navigationItemType,
      articlesSectionType,
  ],
}

