import AuthRepository from "./AuthRepository";
import DesignStyleRepository from "./DesignStyleRepository";
import DesignTypeRepository from "./DesignTypeRepository";
import IndustryRepository from "./IndustryRepository";
import MailLiteRepository from "./MailLiteRepository";
import PendingTemplateRepository from "./PendingTemplateRepository";
import TagRepository from "./TagRepository";
import TemplateRepository from "./TemplateRepository";
import TypographyRepository from "./TypographyRepository";
import UserRepository from "./UserRepository";

export default {
  auth: AuthRepository(),
  template: TemplateRepository(),
  industry: IndustryRepository(),
  tags: TagRepository(),
  designStyle: DesignStyleRepository(),
  designType: DesignTypeRepository(),
  typography: TypographyRepository(),
  pendingTemplates: PendingTemplateRepository(),
  users: UserRepository(),
  mailLite: MailLiteRepository(),
};
