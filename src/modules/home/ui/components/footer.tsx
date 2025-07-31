export const Footer = () => {
    return (
        <footer className="bg-background border-t border-border text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Shop Branding */}
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Esho Bazzar</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Your one-stop shop for everything you love. Quality products, fast delivery, and unmatched support.
                    </p>
                </div>

                {/* Shop Links */}
                <div>
                    <h3 className="text-sm font-semibold mb-4">Shop</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/categories" className="hover:underline">All Categories</a></li>
                        <li><a href="/deals" className="hover:underline">Deals</a></li>
                        <li><a href="/new" className="hover:underline">New Arrivals</a></li>
                        <li><a href="/best-sellers" className="hover:underline">Best Sellers</a></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="text-sm font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/help" className="hover:underline">Help Center</a></li>
                        <li><a href="/returns" className="hover:underline">Returns & Refunds</a></li>
                        <li><a href="/shipping" className="hover:underline">Shipping Info</a></li>
                        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                {/* Newsletter / Social */}
                <div>
                    <h3 className="text-sm font-semibold mb-4">Stay Connected</h3>
                    <form className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-3 py-2 text-sm border rounded-md bg-background text-foreground border-border"
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="flex space-x-4 mt-4 text-muted-foreground">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Instagram">📸</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-muted-foreground py-6 border-t border-border">
                &copy; {new Date().getFullYear()} Esho Bazzar. All rights reserved.
            </div>
        </footer>
    );
};
