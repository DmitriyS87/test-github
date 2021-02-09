import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const App: FC<{}> = () => {
  return (
    <Box className="wrapper" >
      <Box mb={2}>header</Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" variantMapping={{ h3: "h1" }}>
              Load user repository's data.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{ user: "" }}
              onSubmit={() => console.log("submit")}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        name="user"
                        placeholder="enter user name"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        <Typography>load</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>footer</Box>
    </Box>
  );
};
