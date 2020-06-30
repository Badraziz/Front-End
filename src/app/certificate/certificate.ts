import {User} from '../user/user';
import {Organization} from '../organization/organization';

export class Certificate {
  certificateId: number;
  certificateName: string;
  certificateType: string;
  certificateDescription: string;
  certificateData: string;
  certificateStatues: string;
  userId: User;
  organizationId: Organization;
}
