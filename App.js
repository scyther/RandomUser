/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Card,
  H1,
  CardItem,
  Container,
  Content,
  Header,
  Text,
  Button,
  Spinner,
} from 'native-base';
import axios from 'axios';
import moment from 'moment';

const App = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    try {
      setLoading(true);
      const user = await axios.get('https://randomuser.me/api/');
      // eslint-disable-next-line no-shadow
      const details = user.data.results[0];
      setDetails(details);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Container>
      <Header>
        <H1 style={styles.heading}>Random User</H1>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Card style={styles.card}>
          <CardItem header>
            <Image
              style={styles.image}
              source={{uri: details?.picture?.large, width: 150, height: 150}}
            />
          </CardItem>
          <CardItem bordered>
            <Text style={styles.h2}>
              {details?.name?.title} {details?.name?.first}{' '}
              {details?.name?.last}
            </Text>
          </CardItem>
          <CardItem>
            <Text>{details?.cell}</Text>
          </CardItem>
          <CardItem>
            <Text>{details?.email}</Text>
          </CardItem>
          <CardItem>
            <Text>
              {details?.location?.city} {details?.location?.state}{' '}
              {details?.location?.country}
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              {' '}
              Registerd on {moment(details?.dob?.date).format('YYYY-MM-DD')}
            </Text>
          </CardItem>
        </Card>
        <Button
          style={styles.button}
          onPress={() => {
            getUser();
          }}>
          <Text>Reload</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 20,
  },
  heading: {margin: 10, color: 'white'},
  h2: {fontSize: 30},
  image: {borderRadius: 100},
  button: {alignSelf: 'center', marginTop: 10},
});

export default App;
