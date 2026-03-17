import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";

export default function Home() {
  return (
    <div>
      <Link href="https://www.w3schools.com/tags/tag_link.asp">
        <Icon icon="profile" variant="regular" />
      </Link>
    </div>
  );
}
