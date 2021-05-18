import { Heading, Stack, Box, Text, Input } from '@chakra-ui/react';
import GET_ALL_STARSHIPS from '../../queries/AllStarships';
import GET_STARSHIP from '../../queries/Starship';
import { useQuery, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import vector from './images/Vector.png';

export function HelloWorld() {
  const [selected, setSelected] = useState({});
  const [starships, setStarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [getStarship, { loading, data }] = useLazyQuery(GET_STARSHIP, {
    onCompleted: (data) => {
      setSelected(data);
    },
  });

  const selectShip = async (ship) => {
    setSelected(ship);
    getStarship({
      variables: {
        id: ship.id,
      },
    });
  };

  function Feature({ title, desc, item, ...rest }) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest} onClick={() => selectShip(item)}>
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
        <img src={vector} />
      </Box>
    );
  }

  const starshipsQuery = useQuery(GET_ALL_STARSHIPS, {
    fetchPolicy: 'no-cache',
    variables: {},
    onCompleted: (data) => {
      setStarships(data.allStarships.starships);
      setFiltered(data.allStarships.starships);
    },
  });

  const handleChange = (event) => {
    setFiltered(
      starships.filter((starship) => {
        return starship.name.toLowerCase().includes(event.target.value.toLowerCase());
      })
    );
  };

  if (starshipsQuery.loading) return <Heading color="tomato">Loading...</Heading>;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 2, display: 'flex', alignContent: 'center', alignItems: 'center', justifyItems: 'center' }}>
        <div>Top rated starships</div>
      </div>
      <div style={{ flex: 2, overflowY: 'scroll', height: '50vh', marginTop: '25vh' }}>
        <Input variant="outline" placeholder="Search" onChange={handleChange} />
        <Stack spacing={8}>
          {filtered !== [] &&
            filtered.map((elem: any) => {
              return <Feature title={elem.name} desc={elem.hyperdriveRating} item={elem} />;
            })}
        </Stack>
      </div>
      <div style={{ flex: 2 }}>
        <div
          style={{
            backgroundColor: '#E6F0EF',
            height: '50vh',
            marginTop: '25vh',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          {!data && !loading && <>Select something...</>}
          {loading && <>Loading</>}
          {selected && selected.starship && selected.starship.pilotConnection.pilots.length >= 1 && (
            <>
              {selected.starship.pilotConnection.pilots.map((elem) => {
                return (
                  <>
                    <h1>{elem.name}</h1>
                    <br />
                  </>
                );
              })}
            </>
          )}
          {selected && selected.starship && selected.starship.pilotConnection && selected.starship.pilotConnection.pilots.length == 0 && (
            <>Empty pilots!</>
          )}
        </div>
      </div>
    </div>
  );
}
