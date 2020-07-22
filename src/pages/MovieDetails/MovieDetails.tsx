import React, { useEffect, useRef, useState } from 'react';
import { navigate } from 'hookrouter';
import './MovieDetails.css';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import ImageDisplay from 'components/ImageDisplay/ImageDisplay';
import WeekPlay from 'models/week-play.model';

const dateNow = new Date();

let dataAdapter: any;
let offset: any;

const source: any = [
  {
    localdata: [],
    datatype: 'array',
    datafields:
      [
        { name: 'day', type: 'string' },
        { name: 'firstPlay', type: 'string' },
        { name: 'secondPlay', type: 'string' },
        { name: 'thirdPlay', type: 'string' },
      ],
  },
];

const columns = [
  { text: 'Day', datafield: 'day', width: 130 },
  { text: 'First play', datafield: 'firstPlay' },
  { text: 'Second play', datafield: 'secondPlay' },
  { text: 'Thrid play', datafield: 'thirdPlay' },
];


const MovieDetails = ({ id, getMovie, selectedMovie, repertoires, getRepertoryByMovieId }) => {
  const [day, setDay] = useState<string | null>(null);
  const [playTime, setPlayTime] = useState<string | null>(null);
  const jqxGrid = useRef<JqxGrid>(null);

  useEffect(() => {
    getMovie(id);
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      getRepertoryByMovieId(selectedMovie.id);
    }
  }, [selectedMovie]);

  const cellSelected = (event) => {
    if (jqxGrid.current) {
      const { rowindex, datafield } = event.args;
      if (event.args.datafield === 'day') {
        jqxGrid.current.unselectcell(rowindex, datafield);
        setDay(null);
        setPlayTime(null);
        return;
      }

      setDay(rowindex);
      const [first] = jqxGrid.current.getcelltext(rowindex, datafield).split(' ');
      setPlayTime(first);
    }
  };

  const seatsSelect = () => {
    const repertory = repertoires.find(rep => rep.playTime === playTime && rep.day === (((day + offset) % 7) + 1));

    navigate(`/hall/${repertory.hallId}/${repertory.id}`);
  };

  if (selectedMovie && repertoires && repertoires.length > 0) {
    repertoryDataGrid(repertoires);

    return (
      <div id="movie-details-wrapper">
        <div id="title">
          <h1>{selectedMovie.title}</h1>
          <h2 className="pg-rated-runtime">
            {selectedMovie.rated}
            {' '}
            |
            {' '}
            {selectedMovie.runtime}
          </h2>
          <h2 className="pg-rated-runtime">
            In Theaters:
            {selectedMovie.released}
          </h2>
        </div>

        <div className="plot">
          <div className="image-plot">
            <ImageDisplay key={selectedMovie.id} renderProp={(image) => <img className="poster" src={image} alt="" />} imageUrl={selectedMovie.id} />
            <h2 className="plot-header">Plot</h2>
            <p className="plot-text">{selectedMovie.plot}</p>
            <h2 className="plot-header">Director</h2>
            <p className="plot-text">{selectedMovie.director}</p>
            <h2 className="plot-header">Cast</h2>
            <p className="plot-text">{selectedMovie.actors}</p>
          </div>
          <div className="tickets">
            <h1 className="buy-tickets">Reserve tickets online</h1>
            <JqxGrid
              ref={jqxGrid}
              className="jqx-grid"
              source={dataAdapter}
              columns={columns}
              showstatusbar={false}
              columnsheight={50}
              autoheight={true}
              editable={false}
              selectionmode="singlecell"
              showheader={false}
              onCellselect={event => cellSelected(event)}
            />
            <JqxButton
              className="jqx-button"
              template="inverse"
              roundedCorners="all"
              width="200"
              height="40"
              value="Click here to select seats"
              disabled={!playTime}
              onClick={() => {
                if (playTime) {
                  seatsSelect();
                }
              }}
            />
          </div>
          {selectedMovie.isMoviePlaying && (
            <div className="tickets">
              <h1>Coming Soon</h1>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (<div />);
};

const repertoryDataGrid = (repertoires) => {
  const monday: WeekPlay = { day: 'Monday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const tuesday: WeekPlay = { day: 'Tuesday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const wednesday: WeekPlay = { day: 'Wednesday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const thursday: WeekPlay = { day: 'Thursday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const friday: WeekPlay = { day: 'Friday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const saturday: WeekPlay = { day: 'Saturday', firstPlay: '', secondPlay: '', thirdPlay: '' };
  const sunday: WeekPlay = { day: 'Sunday', firstPlay: '', secondPlay: '', thirdPlay: '' };

  repertoires.forEach(rep => {
    switch (rep.day) {
      case 1: monday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 2: tuesday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 3: wednesday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 4: thursday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 5: friday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 6: saturday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      case 7: sunday[timeOfPlay(rep.playTime)] = `${rep.playTime} - ${rep.price} din.`; break;
      default:
        break;
    }
  });

  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
  const sourceData: WeekPlay[] = [];

  offset = dateNow.getDay() - 1;
  offset = offset === -1 ? 6 : offset;

  for (let index = 0; index < 7; index++) {
    const nextday = new Date(dateNow);
    nextday.setDate(dateNow.getDate() + index);
    const parsedDate = nextday.toLocaleDateString().split('/');

    const dayIndex = (index + offset) % 7;
    const currentDate = days[dayIndex];
    currentDate.day += ` - ${parsedDate[1]}.${parsedDate[0]}`;

    sourceData.push(currentDate);
  }

  source.localdata = sourceData;
  dataAdapter = new jqx.dataAdapter(source);
};

const timeOfPlay = (time) => {
  if (+time.split(':')[0] < 9) {
    return 'firstPlay';
  } if (+time.split(':')[0] < 16) {
    return 'secondPlay';
  }
  return 'thirdPlay';
};


export default MovieDetails;
