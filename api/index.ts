import AuthRepository from "./AuthRepository";
import DesignStyleRepository from "./DesignStyleRepository";
import DesignTypeRepository from "./DesignTypeRepository";
import IndustryRepository from "./IndustryRepository";
import TagRepository from "./TagRepository";
import TemplateRepository from "./TemplateRepository";
import TypographyRepository from "./TypographyRepository";

export default {
  auth: AuthRepository(),
  template: TemplateRepository(),
  industry: IndustryRepository(),
  tags: TagRepository(),
  designStyle: DesignStyleRepository(),
  designType: DesignTypeRepository(),
  typography: TypographyRepository(),
};
