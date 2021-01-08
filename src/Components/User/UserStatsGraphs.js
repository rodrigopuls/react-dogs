import React from 'react';
import styles from './UserStatsGraphs.module.css';
import {
  VictoryContainer,
  VictoryPie,
  VictoryChart,
  VictoryBar,
} from 'victory';

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    console.log(data);

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b),
    );

    const graphData = data.map((item) => {
      return { x: item.title, y: Number(item.acessos) };
    });
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Visits: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
          containerComponent={
            <VictoryContainer className={styles.victoryContainer} />
          }
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart
          containerComponent={
            <VictoryContainer className={styles.victoryContainer} />
          }
        >
          <VictoryBar data={graph} alignment="start"></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
