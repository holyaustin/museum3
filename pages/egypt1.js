import React from 'react';
import { jsx, Box } from "theme-ui";
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import Footer from './Footer'
import Watching from '../components/mummy1';

const styles = {
  section: {
    // ... (existing styles)
    pt: [null, null, null, 10], // Adjust top padding for mobile screens
    pb: [2, null, null, null], // Adjust bottom padding for mobile screens
  },
};

export default function AddFile() {

  const sharelink = "https://www.youtube.com/embed/Zwqy4XRiNBU";
  
  return (
    <Box as="section" sx={styles.section} className="bg-blue-100">
      <>
        {/* ... (other components and JSX) ... */}

          <Layout>
            <SEO
              title="Add new file"
              description="add a new file"
            />
            <Watching />
          </Layout>
          <Footer />


        {/* ... (other components and JSX) ... */}
      </>
    </Box>
  );
}

