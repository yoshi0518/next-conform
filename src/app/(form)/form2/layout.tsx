import { FormProvider } from '@/app/(form)/form2/_component/form-provider';

const Form2Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => <FormProvider>{children}</FormProvider>;

export default Form2Layout;
