import React from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import { Navigation } from "../components/PlanNavigation";

// Inspired by https://mui.com/material-ui/getting-started/templates/pricing/
const tiers = [
  {
    title: 'Starter',
    price: '0',
    enabled: [
      'Upload, Store, Render, and Send 15 Invoices',
      'Invoice Data Manager',
    ],
    disabled: [
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
  },
  {
    title: 'Standard',
    price: '39.99',
    enabled: [
      'Upload, Store, Render, and Send 200 Invoices',
      'Invoice Data Manager',
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
    ],
    disabled: [
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
  },
  {
    title: 'Ultimate',
    subheader: 'Our Most Popular Plan',
    price: '79.99',
    enabled: [
      'Upload, Store, Render, and Send Unlimited Invoices',
      'Invoice Data Manager',
      'Invoice Validator Interface',
      'Download Validation Report',
      'Inventory Actions',
      'Warehouse Analytics',
      'Ask GPT',
      'Warehouse Planning',
      'Delivery Heatmap View',
    ],
    disabled: [],
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Warehouse Planning',
      'Warehouse Analytics',
      'Inventory Actions',
      'Invoice Data Manager',
    ],
  },
  {
    title: 'Legal',
    description: ['Privacy Policy', 'Terms of Use'],
  },
];

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        ChurroFlow
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Plan = () => {
  // const { user, setPlan } = useAuth();

  return (
    <React.Fragment>
    <Navigation />
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' },  }} />
    <CssBaseline />
    {/* Hero unit */}
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 0, pb: 6 }}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        marginTop={"6em"}
        color="text.primary"
        gutterBottom
      >
        ChurroFlow Plans
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p" marginTop={10}>
        Be on top of your warehousing strategy and inventory with our premium features.
      </Typography>
    </Container>
    {/* End hero unit */}
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Ultimate' ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={tier.title === 'Ultimate' ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: 'center',
                  fontSize: 'small',
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <ul>
                  {tier.enabled.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={line}
                    >
                      <Grid style={{ display: "flex" }}>
                          <DoneIcon />
                          <Typography>{line}</Typography>
                      </Grid>
                    </Typography>
                  ))}
                </ul>
                <ul>
                  {tier.disabled.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={line}
                    >
                      <Grid style={{ display: "flex", opacity: 0.5}}>
                          <CloseIcon />
                          <Typography>{line}</Typography>
                      </Grid>
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={"contained"}
                  onClick={() => <Navigate to="/register" />}
                >
                  <Link color="inherit" href="/register">
                    Sign up now
                  </Link>{' '}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    {/* Footer */}
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    {/* End footer */}
  </React.Fragment>
  );
};

export default Plan;
