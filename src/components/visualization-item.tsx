import React from 'react';
import { GeneratedData } from '../types/general-types';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { histogramConfiguration } from '../utils/constants';
import styled from 'styled-components';
import {
    solve,
    solveEpsilon,
    sortItemsByRatio,
    sortItemsByValue,
    sortItemsByWeight
} from '../utils/data-utils';
import { Divider } from 'antd';

interface VisualizationItemProps {
    data: GeneratedData;
    index: number;
}

const VisualizationItem = (props: VisualizationItemProps) => {
    const { data, index } = props;
    const sourceConfig = histogramConfiguration(`Source Data ${index + 1}`, data);
    const sortedByValues = histogramConfiguration(
        `Sorted by Values ${index + 1}`,
        sortItemsByValue(data, true)
    );
    const sortedByWeights = histogramConfiguration(
        `Sorted by Weights ${index + 1}`,
        sortItemsByWeight(data, true)
    );
    const sortedByRatios = histogramConfiguration(
        `Sorted by Ratios ${index + 1}`,
        sortItemsByRatio(data, true)
    );

    const firstSolution = solve(1000, data);
    const secondSolution = solveEpsilon(0.01, 1000, data);

    return (
        <div>
            <ExternalContainer>
                <InternalContainer>
                    <HighchartsReact highcharts={Highcharts} options={sourceConfig} />
                    <HighchartsReact highcharts={Highcharts} options={sortedByValues} />
                    <HighchartsReact highcharts={Highcharts} options={sortedByWeights} />
                    <HighchartsReact highcharts={Highcharts} options={sortedByRatios} />
                </InternalContainer>
            </ExternalContainer>
            <Divider />
            <div>
                <span style={{ fontWeight: 'bold' }}>Without epsilon: </span>
                {firstSolution.actualSize}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>With epsilon: </span>
                {secondSolution}
            </div>
        </div>
    );
};

const ExternalContainer = styled.div`
    overflow: scroll;
    max-width: 100%;
`;

const InternalContainer = styled.div`
    width: 10000px;
`;
export default VisualizationItem;
