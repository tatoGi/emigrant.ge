'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { COUNTRIES, CITIES_BY_COUNTRY, PROFESSIONS } from '@/lib/data'

interface HeroSearchBarProps {
  initialCountry?: string
  initialCity?: string
  initialProfession?: string
  compact?: boolean
}

const HeroSearchBar = ({
  initialCountry = '',
  initialCity = '',
  initialProfession = '',
  compact = false,
}: HeroSearchBarProps) => {
  const [country, setCountry] = useState(initialCountry)
  const [city, setCity] = useState(initialCity)
  const [profession, setProfession] = useState(initialProfession)
  const [countryOpen, setCountryOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [professionOpen, setProfessionOpen] = useState(false)
  const router = useRouter()

  const allCities = useMemo(
    () =>
      Array.from(new Set(Object.values(CITIES_BY_COUNTRY).flat())).sort((a, b) =>
        a.localeCompare(b),
      ),
    [],
  )

  const cityToCountry = useMemo(
    () =>
      Object.entries(CITIES_BY_COUNTRY).reduce<Record<string, string>>((acc, [countryName, cities]) => {
        cities.forEach((cityName) => {
          if (!acc[cityName]) {
            acc[cityName] = countryName
          }
        })
        return acc
      }, {}),
    [],
  )

  const cities = country ? CITIES_BY_COUNTRY[country] || [] : allCities

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (country) params.set('country', country)
    if (city) params.set('city', city)
    if (profession) params.set('profession', profession)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className={`bg-card rounded-2xl shadow-card-hover border border-border ${compact ? 'p-2' : 'p-3'}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">Country</label>
          <Popover open={countryOpen} onOpenChange={setCountryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={countryOpen}
                className="w-full justify-between px-3 pb-2 text-sm text-foreground font-body h-auto hover:bg-transparent"
              >
                {country || 'Any country'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="Any country"
                      onSelect={() => {
                        setCountry('')
                        setCity('')
                        setCountryOpen(false)
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', !country ? 'opacity-100' : 'opacity-0')} />
                      Any country
                    </CommandItem>
                    {COUNTRIES.map((countryOption) => (
                      <CommandItem
                        key={countryOption}
                        value={countryOption}
                        onSelect={() => {
                          const isChangingCountry = country && country !== countryOption
                          setCountry(countryOption)
                          if (isChangingCountry && city && !CITIES_BY_COUNTRY[countryOption]?.includes(city)) {
                            setCity('')
                          }
                          setCountryOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            country === countryOption ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {countryOption}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden md:block w-px bg-border self-stretch" />

        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">City</label>
          <Popover open={cityOpen} onOpenChange={setCityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={cityOpen}
                className="w-full justify-between px-3 pb-2 text-sm text-foreground font-body h-auto hover:bg-transparent"
              >
                {city || 'Any city'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="Any city"
                      onSelect={() => {
                        setCity('')
                        setCityOpen(false)
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', !city ? 'opacity-100' : 'opacity-0')} />
                      Any city
                    </CommandItem>
                    {cities.map((cityOption) => (
                      <CommandItem
                        key={cityOption}
                        value={`${cityOption} ${cityToCountry[cityOption] ?? ''}`}
                        onSelect={() => {
                          setCity(cityOption)
                          if (!country && cityToCountry[cityOption]) {
                            setCountry(cityToCountry[cityOption])
                          }
                          setCityOpen(false)
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', city === cityOption ? 'opacity-100' : 'opacity-0')} />
                        {cityOption}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden md:block w-px bg-border self-stretch" />

        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">Profession / Service</label>
          <Popover open={professionOpen} onOpenChange={setProfessionOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={professionOpen}
                className="w-full justify-between px-3 pb-2 text-sm text-foreground font-body h-auto hover:bg-transparent"
              >
                {profession || 'Any profession'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search profession..." />
                <CommandList>
                  <CommandEmpty>No profession found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="Any profession"
                      onSelect={() => {
                        setProfession('')
                        setProfessionOpen(false)
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', !profession ? 'opacity-100' : 'opacity-0')} />
                      Any profession
                    </CommandItem>
                    {PROFESSIONS.map((professionOption) => (
                      <CommandItem
                        key={professionOption}
                        value={professionOption}
                        onSelect={() => {
                          setProfession(professionOption)
                          setProfessionOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            profession === professionOption ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {professionOption}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          onClick={handleSearch}
          size={compact ? 'default' : 'lg'}
          className="rounded-xl gap-2 px-6 shrink-0"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}

export default HeroSearchBar
