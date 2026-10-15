import { useEffect, useState } from "react";
import { MapPin, Search, Store } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { ShopCard } from "../components/domain";
import { EmptyState, Notice, Spinner, cx } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { shopService } from "../services/shopService";

const SORTS = [
  { value: "closest", label: "Closest" },
  { value: "fastest", label: "Fastest" },
  { value: "rating", label: "Highest Rated" },
];

export function HomePage() {
  const { user, orders } = useApp();
  const [search, setSearch] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [sort, setSort] = useState("closest");
  const [shops, setShops] = useState(null);
  const [error, setError] = useState("");
  const loc = shopService.location();

  useEffect(() => {
    let alive = true;
    setShops(null);
    shopService
      .list({ search, openOnly, sort })
      .then((r) => alive && setShops(r))
      .catch(() => alive && setError("Couldn't load shops. Please try again."));
    return () => {
      alive = false;
    };
  }, [search, openOnly, sort, orders]);

  return (
    <AppShell>
      <div className="loc">
        <MapPin size={16} aria-hidden />
        <div>
          <span className="label">Current location</span>
          <strong>{loc.label}</strong>
        </div>
      </div>
      <h1 className="h1">Hello, {user?.name.split(" ")[0]}</h1>
      <p className="muted">Find the best print shops near you.</p>
      <div className="search">
        <Search size={18} aria-hidden />
        <input
          type="search"
          placeholder="Search print shops or areas…"
          aria-label="Search print shops"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="chips" role="group" aria-label="Filter and sort">
        <button
          className={cx("chip", openOnly && "is-on")}
          aria-pressed={openOnly}
          onClick={() => setOpenOnly((v) => !v)}
        >
          Open Now
        </button>
        {SORTS.map((s) => (
          <button
            key={s.value}
            className={cx("chip", sort === s.value && "is-on")}
            aria-pressed={sort === s.value}
            onClick={() => setSort(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="muted small">
        Shop data and live wait times become available when the backend is connected.
      </p>
      {error && <Notice tone="danger">{error}</Notice>}
      {!shops && !error ? (
        <Spinner label="Finding nearby shops…" />
      ) : shops?.length === 0 ? (
        <EmptyState icon={Store} title="No shops found">
          Shop discovery is unavailable until the backend connection is configured.
        </EmptyState>
      ) : (
        <div className="list">
          {shops?.map((s) => (
            <ShopCard key={s.id} shop={s} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
