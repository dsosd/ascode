let raw_table = `а a
б '6
в v
г r
д g
е e
ё 'e
ж 'x
з z
и u
й 'u
к k
л l
м m
н h
о o
п n
р p
с c
т t
у y
ф 'q
х x
ц 'v
ч '4
ш w
щ 'w
ъ 'b
ы i
ь b
э '3
ю 'o
я q
' ''`;

let table_ru_en = new Map();
let table_en_ru = new Map();

for (let it of raw_table.split("\n")){
	let parts = it.split(" ");
	table_ru_en.set(parts[0], parts[1]);
	table_en_ru.set(parts[1], parts[0]);
}

let encode_ru = (str) => {
	let ret = [];

	for (let char of str){
		if (table_ru_en.has(char)){
			ret.push(table_ru_en.get(char));
		}
		else{
			ret.push(char);
		}
	}
	return ret.join("");
};

let decode_ru = (str) => {
	let ret = [];

	for (let i = 0; i < str.length; ++i){
		if (str.charAt(i) == "'"){
			if (i + 1 >= str.length || !table_en_ru.has(str.substr(i, 2))){
				return null;
			}
			ret.push(table_en_ru.get(str.substr(i, 2)));
			++i;
		}
		else if (table_en_ru.has(str.charAt(i))){
			ret.push(table_en_ru.get(str.charAt(i)));
		}
		else{
			ret.push(str.charAt(i));
		}
	}
	return ret.join("");
};
