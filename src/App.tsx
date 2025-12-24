import { ThemeProvider } from "@/components/theme-provider"
import ClipboardSection from "./components/ClipboardSection"
import ImagesGrid from "./components/ImagesGrid"
import './App.css'
import SearchBarFilter from "./components/SearchBarFilter"
import SelectTypeFilter from "./components/SelectTypeFilter"
import { useState } from "react"

type Filters = {
    searchText: string
    type: string
}

function App() {

	const [filters, setFilters] = useState<Filters>({
        searchText: "",
        type: ""
    })

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-screen bg-background">
				<ClipboardSection />

				<section className="spy-8 flex justify-center px-10 py-10 bg-muted/30">
					<div className="container flex items-center justify-between gap-8">

						<SearchBarFilter value={filters.searchText} onChange={(value) => 
							setFilters(prev => (
								{...prev, searchText: value, type: ''}
							))
						} />

						<SelectTypeFilter value={filters.type} onChange={(value) => 
							setFilters(prev => (
								{...prev, type: value, searchText: ''}
							))
						} />

					</div>
				</section>

				<ImagesGrid searchValue={filters} />
			</div>
		</ThemeProvider>
	)
}

export default App