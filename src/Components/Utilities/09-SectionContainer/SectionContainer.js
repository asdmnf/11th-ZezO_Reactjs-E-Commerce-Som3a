import './SectionContainer.css'
import styled from 'styled-components';

const StyledSection = styled.section`
    width: 100%;
    min-height: 100vh;
    padding-top: 100px;
`;



const SectionContainer = (props) => {
    return (
        <StyledSection>{props.children}</StyledSection>
    )
}

export default SectionContainer