import React from 'react';
import { jsx, Box } from "theme-ui";
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import Footer from './Footer'
// import Mintfile from '../components/Mintfile';
// import Watching from '../components/watching';
import Watching from '../components/viewing3';


const styles = {
  section: {
    // ... (existing styles)
    pt: [null, null, null, 10], // Adjust top padding for mobile screens
    pb: [4, null, null, 8], // Adjust bottom padding for mobile screens
  },
};

export default function AddFile() {
  return (
    <Box as="section" sx={styles.section} className="bg-blue-100">
      <>
        {/* ... (other components and JSX) ... */}

        <ThemeProvider theme={theme}>
          <Layout>
            <SEO
              title="Add new file"
              description="add a new file"
            />
            <Watching />
          </Layout>
          <Footer />
        </ThemeProvider>

        {/* ... (other components and JSX) ... */}
      </>
    </Box>
  );
}