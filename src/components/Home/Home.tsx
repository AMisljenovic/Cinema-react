import React, { Fragment } from 'react';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
import JqxScrollView from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscrollview';

const Home = () => {
  // const movieIds: string[] = [
  //   '0fe4656a-4598-4f6f-9e7c-3f9347153a10',
  //   '13e6d16d-e8a9-4112-a3d0-fda72a846b17',
  //   '164ca3af-4b7f-454f-bd07-9b8d6c3736cc',
  //   '1df1dac8-0b73-486e-b1a0-ded9d9d0849c',
  //   '251759f9-a3c5-43d3-9734-39a288f2a461',
  // ];

  // TODO(AM): implement home page, add redux part

  const isServerDown = true;

  const selectMovie = (event) => {
    console.log(event);
  };


  if (!isServerDown) {
    return (<JqxLoader imagePosition="top" width="150" height="90" />);
  }

  return (
    <Fragment>
      <div id="wrapper">
        <JqxScrollView slideShow slideDuration={4000} width="960" height="540">
          <div id="wide-0" className="photo" onClick={(event) => selectMovie(event)} />
          <div id="wide-1" className="photo" onClick={(event) => selectMovie(event)} />
          <div id="wide-2" className="photo" onClick={(event) => selectMovie(event)} />
          <div id="wide-3" className="photo" onClick={(event) => selectMovie(event)} />
          <div id="wide-4" className="photo" onClick={(event) => selectMovie(event)} />
        </JqxScrollView>
      </div>
    </Fragment>
  );
};

export default Home;
