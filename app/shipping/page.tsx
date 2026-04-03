export default function ShippingReturns() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-sm md:text-base">
      <h1 className="text-3xl font-bold mt-12 mb-6">Shipping & Returns</h1>

      {/* Shipping Policy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Processing Time</h3>
            <p>
              Orders are processed within <strong>1–3 business days</strong>{" "}
              (excluding weekends and holidays).
            </p>
            <p>
              Once your order ships, you will receive a confirmation email with
              tracking information (if applicable).
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Shipping Methods</h3>
            <p>
              All orders are shipped via Canada Post, with shipping options
              selected by the customer at checkout. Available options may
              include:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Lettermail (untracked)</li>
              <li>Expedited Parcel</li>
              <li>Xpresspost</li>
              <li>Priority Shipping</li>
            </ul>
            <p className="mt-2">
              Shipping rates are calculated at checkout based on your location
              and selected method.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Estimated Delivery Times</h3>
            <ul className="list-disc ml-6 mt-2">
              <li>Ontario: 1–5 business days</li>
              <li>Canada-wide: 2–10 business days</li>
              <li>International: 5–15+ business days</li>
            </ul>
            <p className="mt-2 text-gray-600">
              Delivery times are estimates and may vary due to carrier delays,
              weather, or customs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Untracked Shipping (Lettermail)</h3>
            <p>
              If you select an untracked shipping option, your order will not
              include tracking or insurance.
            </p>
            <p>
              We are not responsible for lost, delayed, or missing packages once
              they have been shipped.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Tracked Shipping & Insurance Responsibility
            </h3>
            <p>
              Tracked shipping options may include limited coverage through
              Canada Post. It is the{" "}
              <strong>
                customer’s responsibility to choose a shipping option with
                sufficient insurance coverage
              </strong>{" "}
              for their order value.
            </p>
            <p>
              We are not responsible for lost, stolen, or damaged packages beyond
              the coverage included with the selected shipping method.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Incorrect Addresses</h3>
            <p>
              Please ensure your shipping details are correct at checkout. We are
              not responsible for orders shipped to incorrect or incomplete
              addresses.
            </p>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Returns & Exchanges
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">All Sales Final</h3>
            <p>
              Due to the nature of our products, all sticker sales are final.
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Change of mind</li>
              <li>Incorrect item selected</li>
              <li>Minor color or size variations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Damaged or Incorrect Orders</h3>
            <p>
              If your order arrives damaged or incorrect, contact us within{" "}
              <strong>7 days of delivery</strong> with:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Your order number</li>
              <li>A description of the issue</li>
              <li>Photos of the item(s)</li>
            </ul>
            <p className="mt-2">
              We will provide a replacement or refund where appropriate.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Lost Packages</h3>
            <ul className="list-disc ml-6 mt-2">
              <li>Tracked shipments: We will assist with Canada Post claims</li>
              <li>
                Untracked shipments: We cannot guarantee delivery or offer
                replacements
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <p>
              For any questions about your order, please contact:
            </p>
            <p className="mt-1 font-medium">your@email.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
