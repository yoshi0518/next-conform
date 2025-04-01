import { FormProvider } from '@/app/(form)/form4/_component/form-provider';

const Form4Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => <FormProvider>{children}</FormProvider>;

export default Form4Layout;
