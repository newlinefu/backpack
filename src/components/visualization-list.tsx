import React from 'react';
import data1 from '../utils/data/data-1.json';
import data2 from '../utils/data/data-2.json';
import data3 from '../utils/data/data-3.json';
import { GeneratedData } from '../types/general-types';
import VisualizationItem from './visualization-item';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const dataList: GeneratedData[] = [data1, data2, data3];
const VisualizationList = (props: {}) => {
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                {dataList.map((d, i) => (
                    <Panel header={i + 1} key={i + 1}>
                        <VisualizationItem data={d} index={i} />{' '}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default VisualizationList;
