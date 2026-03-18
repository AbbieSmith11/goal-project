import React from "react";

import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Navbar } from "../components/Navbar/Navbar";

import { Tabs, Tab, TabPanel, TabList } from '../components/Tabs/Tabs'

export default function Home() {
  return (
    <div>
      <Navbar>
        <Link href="https://www.w3schools.com/tags/tag_link.asp">
          <Icon icon="profile" variant="regular" />
        </Link>
        <Link href="https://www.w3schools.com/tags/tag_link.asp">
          <Icon icon="profile" variant="regular" />
        </Link>
        <Link href="https://www.w3schools.com/tags/tag_link.asp">
          <Icon icon="profile" variant="regular" />
        </Link>
      </Navbar>

      <Tabs defaultValue="All">
        <TabList>
          <Tab value="All">All</Tab>
          <Tab value="Work">Work</Tab>
          <Tab value="Personal">Personal</Tab>
        </TabList>

        <TabPanel value="All">
          <p>All content</p>
        </TabPanel>

        <TabPanel value="Work">
          <p>Work</p>
        </TabPanel>

        <TabPanel value="Personal">
          <p>Personal</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};