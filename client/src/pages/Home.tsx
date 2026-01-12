import Header from "../components/Header"
import Hero from "../components/home/Hero"
import Section from "../components/ui/Section"
import PizzaMenu from "../components/home/PizzaMenu"
import DealsGrid from "../components/home/DealsGrid"
import DessertsMenu from "../components/home/DessertsMenu"
import DeliveryInfo from "../components/home/DeliveryInfo"
import NewsletterSignup from "../components/home/NewsletterSignup"
import Footer from "../components/home/Footer"


export default function Home() {


  return (
    <>
      <Header />
      <Hero />

      <Section
        title="Fan Favorites"
        description="From classic combinations to bold flavors, these pizzas top our list for a reason."
        bgColor="bg-fire-red-98"
      />
      <PizzaMenu />

      <Section
        title="Hot Pizza, Hotter Deals"
        description="From family-sized deals to solo slices, find the perfect offer for your pizza cravings."
        bgColor="bg-white"
      />
      <DealsGrid />

      <Section
        title="Save Room for Dessert!"
        description="Our desserts are worth it. Trust us, you won’t want to miss these sweet delights."
        bgColor="bg-white"
      />
      <DessertsMenu />

      <Section
        title="Find Your Nearest Pizza Spot"
        description="Locate our stores, check delivery zones, and pick the best option for you!"
        bgColor="bg-white"
      />
      <DeliveryInfo
        cities={[
          { name: "New York",   image: "/cities/1.webp",  tintClass: "from-fire-red/55" },
          { name: "London",     image: "/cities/2.webp",  tintClass: "from-amber-500/55" },
          { name: "Amsterdam",  image: "/cities/3.webp",  tintClass: "from-emerald-500/55" },
          { name: "Berlin",     image: "/cities/4.webp",  tintClass: "from-cyan-500/55" },
          { name: "Bucharest",  image: "/cities/5.webp",  tintClass: "from-orange-500/55" },
        ]}
        sections={[
          {
            title: "Delivery Zones",
            content: (
              <div className="space-y-5 text-[15px]">
                <div>
                  <p className="font-semibold">New York:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      We deliver within a <b>10-mile radius</b> of our central location in <b>Manhattan</b>.
                    </li>
                    <li>
                      <b>Zip Codes Covered:</b> 10001, 10002, 10003, 10011, 10019, and nearby.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Amsterdam:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      We deliver across the <b>Amsterdam-Centrum</b> and neighboring districts, within a <b>7 km radius</b>.
                    </li>
                    <li>
                      <b>Postcodes Covered:</b> 1011–1019, 1050, and nearby.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Bucharest:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Delivery covers a <b>10 km radius</b> from our central <b>Piata Romana</b> location.
                    </li>
                    <li>
                      <b>Postcodes Covered:</b> 010011–010999, 030011–030999, and nearby.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">London:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Our delivery services cover areas within a <b>10 km radius</b> from our location in <b>Soho</b>.
                    </li>
                    <li>
                      <b>Postcodes Covered:</b> W1, SW1, WC1, NW1, and nearby.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Berlin:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      We deliver within a <b>10 km radius</b> of our <b>Mitte</b> location.
                    </li>
                    <li>
                      <b>Postcodes Covered:</b> 10115, 10435, 10997, and nearby.
                    </li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Delivery Methods & Fees",
            content: (
              <div className="space-y-6 text-[15px]">
                <div>
                  <p className="font-semibold">Delivery Methods:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <b>Online Ordering:</b> Place your order directly on our website for quick and easy delivery.
                    </li>
                    <li>
                      <b>Phone Orders:</b> Call our store to place your delivery order.
                    </li>
                    <li>
                      <b>Partner Apps:</b> Available on Uber Eats, DoorDash (New York, London, Berlin), and Glovo (Bucharest, Amsterdam).
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Delivery Fees & Minimum Order:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><b>New York:</b> $2.99 delivery fee · $15 minimum order</li>
                    <li><b>London:</b> £3.50 delivery fee · £12 minimum order</li>
                    <li><b>Amsterdam:</b> €2.50 delivery fee · €15 minimum order</li>
                    <li><b>Berlin:</b> €2.99 delivery fee · €12 minimum order</li>
                    <li><b>Bucharest:</b> 12 RON delivery fee · 50 RON minimum order</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Delivery Time Estimate:</p>
                  <p>
                    We aim to deliver within <b>30–45 minutes</b> in all cities. Times may vary based on traffic, weather, and peak hours.
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Contactless Delivery:</p>
                  <p>
                    Contactless delivery is available upon request for all orders. Select the option during checkout for a no-contact drop-off.
                  </p>
                </div>
              </div>
            ),
          },
          {
            title: "Pickup Info",
            content: (
              <div className="space-y-5 text-[15px]">
                <div>
                  <p className="font-semibold">New York:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Pickup is available at our <b>Manhattan</b> location. Place your order online or call ahead for fast pickup service.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">London:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Swing by our <b>Soho</b> location for pickup. Order online in advance to skip the wait.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Amsterdam:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Convenient pickup at our <b>Amsterdam-Centrum</b> store. Pre-order online for quick collection.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Berlin:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Pickup is available at our <b>Mitte</b> location. Skip the queue by placing your order online for collection.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Bucharest:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Pickup at our <b>Piata Romana</b> location. Order ahead for a seamless pickup experience.
                    </li>
                  </ul>
                </div>
              </div>
            ),
          },
        ]}
      />

      <NewsletterSignup />
      <Footer />
    </>
  )
}
