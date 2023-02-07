import type { NextPage } from "next";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

import { Layout } from "@layouts";
import { EntryList, NewEntry } from "@ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenKira">
      <Grid container spacing={2}>
        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 180px)'}}>
            <CardHeader title="Pendientes"/>
              {/* Nueva Entrada*/}
              <NewEntry />
              <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 180px)'}}>
            <CardHeader title="En Progreso"/>
            <EntryList status="in-progress"/>
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{height: 'calc(100vh - 180px)'}}>
            <CardHeader title="Completadas"/>
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
};

export default HomePage;
