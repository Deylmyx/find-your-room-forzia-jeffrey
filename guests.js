// ✏️ EDIT THIS FILE. One line per guest: name, place (where they stay) and room.
// "note" is optional. Guests in the same place + room automatically see who they share with.
const STAY = "March 15–17, 2027";

const LB = "Lake Bantung Ranch";
const NF = "Nato’s Farm";

const GUESTS = [
  // Lake Bantung Ranch – Deluxe Room 1
  { name: "Forzia Tiamzon",             place: LB, room: "Deluxe Room 1" },
  { name: "Jeffrey David",              place: LB, room: "Deluxe Room 1" },
  { name: "Gianne Villamar-Pangilinan", place: LB, room: "Deluxe Room 1" },
  { name: "Zyster Roque",               place: LB, room: "Deluxe Room 1" },
  // Lake Bantung Ranch – Deluxe Room 2
  { name: "Rommel David",               place: LB, room: "Deluxe Room 2" },
  { name: "Ludy David",                 place: LB, room: "Deluxe Room 2" },
  { name: "Lourdes Rivera",             place: LB, room: "Deluxe Room 2" },
  // Lake Bantung Ranch – Family Room 1
  { name: "Divina Tiamzon",             place: LB, room: "Family Room 1" },
  { name: "Domingo Garcia",             place: LB, room: "Family Room 1" },
  { name: "Rina Tiamzon",               place: LB, room: "Family Room 1" },
  { name: "Renante Tiamzon",            place: LB, room: "Family Room 1" },
  { name: "John Dale Villanueva",       place: LB, room: "Family Room 1" },
  { name: "Cherry Tiamzon",             place: LB, room: "Family Room 1" },
  // Lake Bantung Ranch – Family Room 2
  { name: "Joanne Morales-Tan",         place: LB, room: "Family Room 2" },
  { name: "Arley Tan",                  place: LB, room: "Family Room 2" },
  { name: "Al-Fer Salalila",            place: LB, room: "Family Room 2" },
  { name: "Adriane Dela Cruz",          place: LB, room: "Family Room 2" },
  { name: "Donna Pangan",               place: LB, room: "Family Room 2" },
  { name: "Aaron Ordoñez",              place: LB, room: "Family Room 2" },
  // Nato’s Farm – Summer House
  { name: "John Carlo Ocampo",          place: NF, room: "Summer House" },
  { name: "Harris Manansala",           place: NF, room: "Summer House" },
  { name: "Arenz Manabat",              place: NF, room: "Summer House" },
  { name: "Erwin Santiago",             place: NF, room: "Summer House" },
  { name: "Sher Rey Alj Marin",         place: NF, room: "Summer House" },
  { name: "Patrick Enriquez",           place: NF, room: "Summer House" },
  { name: "Ian Enriquez",               place: NF, room: "Summer House" },
  { name: "Adrian Taan",                place: NF, room: "Summer House" },
  // Nato’s Farm – Summer Room
  { name: "Jamaica Caparas",            place: NF, room: "Summer Room" },
  { name: "Matthew Caparas",            place: NF, room: "Summer Room" },
  { name: "Carl Tungol",                place: NF, room: "Summer Room" },
  { name: "Jonathan James Mercado",     place: NF, room: "Summer Room" },
  { name: "Dexter Dizon",               place: NF, room: "Summer Room" },
  { name: "Arkid Medroso",              place: NF, room: "Summer Room" },
  // Nato’s Farm – Creek View
  { name: "Giselle David",              place: NF, room: "Creek View" },
  { name: "Francis David",              place: NF, room: "Creek View" },
  // Nato’s Farm – Family Room
  { name: "Randy David",                place: NF, room: "Family Room" },
  { name: "Danielle Rubin-David",       place: NF, room: "Family Room" },
  { name: "Keisha Rae R. David",       place: NF, room: "Family Room" },
  // Independently arranged (no hotel room from us)
  { name: "Bettina Guevarra",           place: "", room: "Independently arranged", note: "You have arranged your own stay." },
  { name: "Elerie Malang-Alfonso",      place: "", room: "Independently arranged", note: "You have arranged your own stay." },
  { name: "Luis Alfonso",               place: "", room: "Independently arranged", note: "You have arranged your own stay." },
  // RSVP pending
  { name: "Daryll Paule",               place: "", room: "To be confirmed", note: "RSVP pending. Your room will be updated once confirmed." }
];
