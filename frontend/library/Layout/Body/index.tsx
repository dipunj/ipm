import { PageWrapper } from './styles';

const MainContent = ({ children }: { children: JSX.Element }): JSX.Element => {
	return <PageWrapper>{children}</PageWrapper>;
};

export default MainContent;
