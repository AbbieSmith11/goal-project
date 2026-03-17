import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Navbar } from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar orientation="vertical">
        <Link href="https://www.w3schools.com/tags/tag_link.asp">
          <Icon icon="profile" variant="regular" />
        </Link>
      </Navbar>
    </div>
  );
}
