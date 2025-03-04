import * as Yup from 'yup';
import {FormCreate} from './Types';

export const initValueForm: FormCreate = {
  urgency: [],
  status: [],
  title: '',
  description: '',
};

// Validation Form
export const validationFormSchema = Yup.object().shape({
  urgency: Yup.array().min(1, 'Urgency is Required'),
  status: Yup.array().min(1, 'Status is Required'),
  title: Yup.string().required('Title is Required').max(40, 'max 40 character'),
  description: Yup.string().required('Description is Required').max(250, 'max 250 character'),
});
