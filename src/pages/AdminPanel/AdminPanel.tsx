import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import './AdminPanel.css';
import JqxChart, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxchart';

const padding: any = { left: 10, top: 5, right: 10, bottom: 5 };
const titlePadding: any = { left: 50, top: 0, right: 0, bottom: 10 };

const xAxis: any = {
  gridLinesColor: '#ffc700',
  dataField: 'date',
  type: 'date',
  baseUnit: 'day',
  valuesOnTicks: true,
  minValue: '',
  maxValue: '',
  tickMarks: {
    visible: true,
    interval: 1,
    color: '#BCBCBC',
  },
  unitInterval: 1,
  gridLines: {
    visible: true,
    interval: 3,
    color: '#BCBCBC',
  },
  labels: {
    angle: -45,
    rotationPoint: 'topright',
    offset: { x: 0, y: -25 },
  },
};
const valueAxis: any = {
  visible: false,
  title: { text: 'Resrvations per day<br>' },
  tickMarks: { color: '#FFC700' },
};
const seriesGroups: any = [
  {
    type: 'line',
    borderLineColor: '#FFC700',
    series:
            [
              {
                dataField: 'reservationsMade',
                displayText: 'Reservations',
                symbolType: 'square',
                labels:
                    {
                      visible: true,
                      backgroundColor: '#FEFEFE',
                      backgroundOpacity: 0.2,
                      borderColor: '#7FC4EF',
                      borderOpacity: 0.7,
                      padding: { left: 5, right: 5, top: 0, bottom: 0 },
                    },
              },
            ],
  },
];

let pieChartsource = [
  {
    type: '',
    share: 0,
  },
];

let pieChartdataAdapter;

const pieChartSeriesGroups: any[] = [
  {
    type: 'pie',
    showLabels: true,
    series:
            [
              {
                dataField: 'share',
                displayText: 'type',
                labelRadius: 120,
                initialAngle: 15,
                radius: 170,
                centerOffset: 0,
                formatSettings: { sufix: '%', decimalPlaces: 1 },
              },
            ],
  },
];

const dateNow = new Date();

const AdminPanel = ({ getChartData, reservationStatusCode, chartData }) => {
  const [dataAdapter, setDataAdapter] = useState<any>(null);
  const [pieChartdataAdapter, setPieChartdataAdapter] = useState<any>(null);

  useEffect(() => {
    getChartData();
    const datePreviousWeek = new Date(dateNow);
    datePreviousWeek.setDate(dateNow.getDate() - 7);
    xAxis.minValue = datePreviousWeek.toLocaleDateString();
    xAxis.maxValue = dateNow.toLocaleDateString();
  }, []);

  useEffect(() => {
    if (reservationStatusCode === 404) {
      alert('You are not authorize to access this page.');
      navigate('/home');
    } else if (reservationStatusCode === 401) {
      alert('Your session has expired. Please sign in again.');
      navigate('/signin');
    }
  }, [reservationStatusCode]);

  useEffect(() => {
    if (chartData.length > 0) {
      pieChartdata(chartData, dateNow.toLocaleDateString());
    }
  }, [chartData]);

  const pieChartdata = (cData, date) => {
    const reservationsPerHall = 25;
    const playingMovies = 5;
    const moviePlaysPerDay = 3;
    const dailyStatistic = cData.find(data => data.date === date);
    const totalAvailableReservations = reservationsPerHall * playingMovies * moviePlaysPerDay;
    const reservedPercent = (100 * dailyStatistic.reservationsMade) / totalAvailableReservations;

    pieChartsource = [
      {
        type: 'Reserved',
        share: reservedPercent,
      },
      {
        type: 'Available',
        share: 100 - reservedPercent,
      },
    ];

    setDataAdapter(new jqx.dataAdapter(chartData));
    setPieChartdataAdapter(new jqx.dataAdapter(pieChartsource));
  };

  return (
    <div className="admin-panel">
      <JqxChart
        style={{ width: '850px', height: '500px', marginTop: '3%' }}
        title="'Made reservations in last 7 days'"
        description="'Displays how many reservations was made per day'"
        showLegend={false}
        enableAnimations={true}
        padding={padding}
        titlePadding={titlePadding}
        source={dataAdapter}
        xAxis={xAxis}
        valueAxis={valueAxis}
        seriesGroups={seriesGroups}
        colorScheme="scheme04"
      />
      <JqxChart
        style={{ width: '850px', height: '500px', marginTop: '3%' }}
        title="'Today reservations'"
        description="'Number of reserved/available seats'"
        showLegend={false}
        enableAnimations={true}
        padding={padding}
        titlePadding={titlePadding}
        source={pieChartdataAdapter}
        showBorderLine={true}
        seriesGroups={pieChartSeriesGroups}
        colorScheme="scheme01"
      />
    </div>
  );
};

export default AdminPanel;
