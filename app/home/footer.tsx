import { Link } from "@heroui/react";

export default function HomePageFooter() {
  return (
    <footer className="texture bg-background/60 dark:bg-default/10 flex flex-col gap-4 p-4">
      <div className="m-4 flex flex-col justify-center gap-4 sm:flex-row sm:gap-16">
        <div>
          <strong className="mb-2 block text-lg">Connect</strong>

          <ul>
            {/* <li>
              <Link isExternal color="foreground" href="https://forms.gle/ABKCKQmQmzvZWbCo8">
                Club Team Applications
              </Link>
            </li> */}
            <li>
              <Link
                isExternal
                color="foreground"
                href="https://groups.ccny.cuny.edu/ACM/club_signup"
              >
                Join Us on Campus Groups
              </Link>
            </li>
            <li>
              <Link isExternal color="foreground" href="https://forms.gle/ntqFUAX7TERrq3oe8">
                Our Club Interest Form
              </Link>
            </li>

            <li>
              <Link isExternal color="foreground" href="https://linktr.ee/acm.ccny">
                See More on Our Linktree
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <strong className="mb-2 block text-lg">Socials</strong>
          <ul>
            <li>
              <Link isExternal color="foreground" href="https://discord.com/invite/CsntEuGJe5">
                Discord
              </Link>
            </li>
            <li>
              <Link isExternal color="foreground" href="https://www.instagram.com/acm.ccny/">
                Instagram
              </Link>
            </li>
            <li>
              <Link isExternal color="foreground" href="https://www.linkedin.com/in/ccnyacm/">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <strong className="mb-2 block text-lg">Contact</strong>

          <ul>
            <li>
              <Link isExternal color="foreground" href="mailto:ccnyacm@gmail.com">
                ccnyacm@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <span className="text-default-500 text-center">&copy; 2025 ACM @ CCNY</span>
    </footer>
  );
}
