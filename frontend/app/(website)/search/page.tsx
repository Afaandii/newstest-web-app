"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id_post: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  created_at: string;
  category?: {
    id_category: number;
    name: string;
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "newest";
  const limit = 10;

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/v1/posts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&sort=${sort}`);
        if (res.ok) {
          const result = await res.json();
          setPosts(result.data || []);
          setTotal(result.meta?.total || 0);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setPosts([]);
      setTotal(0);
      setLoading(false);
    }
  }, [query, page, sort]);

  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}&sort=${sort}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSort: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=1&sort=${newSort}`);
  };

  const totalPages = Math.ceil(total / limit);
  const startResult = (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, total);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
      {/* CNN Style Search Bar - Step 424 style */}
      <div className="mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex bg-white border border-gray-300 shadow-sm overflow-hidden h-14 md:h-16 group focus-within:ring-2 focus-within:ring-red-600 focus-within:border-transparent transition-all">
            <input 
              type="text" 
              defaultValue={query}
              placeholder="Search news, topics, and more..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = e.currentTarget.value.trim();
                  if (val) router.push(`/search?q=${encodeURIComponent(val)}&sort=${sort}`);
                }
              }}
              className="flex-1 h-full px-6 text-lg md:text-xl outline-none placeholder:text-gray-400 font-medium"
            />
            <button className="h-full px-6 md:px-8 bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center cursor-pointer">
              <Search size={28} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-12">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 animate-pulse">
              <div className="w-full md:w-80 aspect-[16/9] bg-gray-100 rounded" />
              <div className="flex-1 space-y-4 py-2">
                <div className="h-4 w-32 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 py-2">
            <div>
              <p className="text-base md:text-lg text-gray-500 font-medium">
                {total > 0 ? (
                   <>Displaying <span className="text-black">{startResult}-{endResult}</span> results out of <span className="text-black">{total}</span> for <span className="text-red-600 font-bold italic">"{query}"</span></>
                ) : (
                  <>Showing no results for <span className="text-red-600 font-bold italic">"{query}"</span></>
                )}
              </p>
            </div>
            {total > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-2">Sorting by</span>
                <div className="flex p-0.5 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => handleSortChange("newest")}
                    className={`px-5 py-1.5 text-[11px] font-bold rounded-md shadow-sm uppercase tracking-wider transition-all cursor-pointer ${
                      sort === "newest" ? "bg-white text-black" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Newest
                  </button>
                  <button 
                    onClick={() => handleSortChange("relevancy")}
                    className={`px-5 py-1.5 text-[11px] font-bold rounded-md uppercase tracking-wider transition-all cursor-pointer ${
                      sort === "relevancy" ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Relevancy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-12 mt-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.id_post} className="flex flex-col md:flex-row gap-8 border-b border-gray-100 pb-12 last:border-0 group">
                  <Link 
                    href={`/berita/${post.id_post}`} 
                    className="w-full md:w-80 shrink-0 relative aspect-[16/9] overflow-hidden bg-gray-50 rounded-sm shadow-sm"
                  >
                    {post.thumbnail ? (
                      <Image 
                        src={post.thumbnail} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-50">
                        <Search size={40} className="opacity-20" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 flex flex-col justify-start">
                     <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em] mb-4">
                      {post.category && (
                        <span className="text-red-600">{post.category.name}</span>
                      )}
                      {post.category && <span className="w-1 h-1 bg-gray-300 rounded-full" />}
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <time dateTime={post.created_at}>
                          {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                      </span>
                    </div>
                    <Link href={`/berita/${post.id_post}`}>
                      <h3 className="text-2xl md:text-[32px] font-black text-[#1a1a1a] leading-[1.15] mb-4 group-hover:text-red-600 transition-colors duration-300 decoration-red-600/30">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-2 text-base md:text-[17px] leading-relaxed max-w-2xl font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))
            ) : !loading && query && (
              <div className="py-24 text-center space-y-4">
                <Search size={80} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-2xl font-bold text-gray-800">No matches found</h3>
                <p className="text-gray-500 max-w-md mx-auto text-lg">
                  We couldn't find any results for "{query}". Try checking your spelling or use different keywords.
                </p>
                <Button variant="outline" className="mt-8 px-8 h-12 font-bold uppercase tracking-widest" onClick={() => router.push("/")}>
                  Return to Home
                </Button>
              </div>
            )}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="rounded-none border hover:bg-gray-100 disabled:opacity-30 h-10 px-4 font-bold uppercase text-[11px] tracking-widest cursor-pointer"
                >
                  <ChevronLeft size={16} className="mr-1" /> Prev
                </Button>
                
                <div className="flex items-center">
                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    const isCurrent = page === p;
                    
                    if (
                      p === 1 || 
                      p === totalPages || 
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-all border-y border-r first:border-l cursor-pointer ${
                            isCurrent 
                              ? "bg-black text-white border-black z-10" 
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    } else if (p === page - 2 || p === page + 2) {
                      return <span key={p} className="w-8 flex justify-center text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <Button 
                  variant="ghost" 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="rounded-none border hover:bg-gray-100 disabled:opacity-30 h-10 px-4 font-bold uppercase text-[11px] tracking-widest cursor-pointer"
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 font-medium italic">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Results...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
