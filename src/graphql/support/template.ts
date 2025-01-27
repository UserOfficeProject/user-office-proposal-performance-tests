
import { getInitData } from '../../support/initData';
import { AsyncClientApi } from '../../utils/sharedType';
import { executeGraphqlQuery } from '../../support/graphql';
import {
  CreateTemplateDocument,
  DeleteTemplateDocument,
} from '../generated/graphql';

export class Template {
  private initData = getInitData();
  constructor(private apiAsyncClient: AsyncClientApi) {}

  async createTemplate() {
    const createdTemplate = await executeGraphqlQuery(
      this.apiAsyncClient,
      CreateTemplateDocument,

      {
        groupId: this.initData?.template.groupId,
        name: this.initData?.template.name,
        description: this.initData?.template.description,
      }
    ).then((data) => {
      return data.createTemplate;
    });
    if (!createdTemplate) {
      throw new Error('Fail to create template');
    }
    return createdTemplate;
  }

  async deleteTemplate(deleteTemplateId: number) {
    const deletedTemplate = await executeGraphqlQuery(
      this.apiAsyncClient,
      DeleteTemplateDocument,
      {
        templateId: deleteTemplateId,
      }
    ).then((data) => {
      return data.deleteTemplate;
    });
    if (!deletedTemplate) {
      throw new Error('Fail to deleted template');
    }
    return deletedTemplate;
  }
}
