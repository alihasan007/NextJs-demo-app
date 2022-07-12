import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data
//   // runs on server  side
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const userName = encodeURIComponent("ali007");
  const password = encodeURIComponent("alihasan007");
  const uri = `mongodb+srv://${userName}:${password}@cluster0.olqur.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const meetupsCollection = client.db("meetups").collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Unidade_I_-_2019-08_Complexo_Industrial.jpg/1280px-Unidade_I_-_2019-08_Complexo_Industrial.jpg",
//     address: "some address 1",
//     description: "This is the first Meetup",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Unidade_I_-_2019-08_Complexo_Industrial.jpg/1280px-Unidade_I_-_2019-08_Complexo_Industrial.jpg",
//     address: "some address 2",
//     description: "This is the second Meetup",
//   },
//   {
//     id: "m3",
//     title: "A third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Unidade_I_-_2019-08_Complexo_Industrial.jpg/1280px-Unidade_I_-_2019-08_Complexo_Industrial.jpg",
//     address: "some address 3",
//     description: "This is the third Meetup",
//   },
// ];
