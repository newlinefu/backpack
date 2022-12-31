import React from 'react';
import styled from 'styled-components';
import VisualizationList from './components/visualization-list';

const App = () => {
    return (
        <MainContainer>
            <VisualizationList />
        </MainContainer>
    );
};

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default App;
