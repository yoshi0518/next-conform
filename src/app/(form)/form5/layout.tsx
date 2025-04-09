import { FormProvider } from '@/app/(form)/form5/_component/form-provider';

const Form5Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => <FormProvider>{children}</FormProvider>;

export default Form5Layout;
