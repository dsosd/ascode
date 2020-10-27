[encode_fr, decode_fr] = (() => {
	let raw_table = `а a
à 'a
â 'b
æ 'd
b b
c c
ç 'c
d d
e e
é 'e
è 'f
ê 'g
ë 'h
f f
g g
h h
i i
î 'i
ï 'j
j j
k k
l l
m m
n n
o o
ô 'o
œ 'p
p p
q q
r r
s s
t t
u u
ù 'u
û 'v
ü 'w
v v
w w
x x
y y
ÿ 'y
' ''`;

	let table_fr_en = new Map();
	let table_en_fr = new Map();

	for (let it of raw_table.split("\n")){
		let parts = it.split(" ");
		table_fr_en.set(parts[0], parts[1]);
		table_en_fr.set(parts[1], parts[0]);
	}

	let encode_fr = (str) => {
		let ret = [];

		for (let char of str){
			if (table_fr_en.has(char)){
				ret.push(table_fr_en.get(char));
			}
			else{
				ret.push(char);
			}
		}
		return ret.join("");
	};

	let decode_fr = (str) => {
		let ret = [];

		for (let i = 0; i < str.length; ++i){
			if (str.charAt(i) == "'"){
				if (i + 1 >= str.length || !table_en_fr.has(str.substr(i, 2))){
					return null;
				}
				ret.push(table_en_fr.get(str.substr(i, 2)));
				++i;
			}
			else if (table_en_fr.has(str.charAt(i))){
				ret.push(table_en_fr.get(str.charAt(i)));
			}
			else{
				ret.push(str.charAt(i));
			}
		}
		return ret.join("");
	};

	return [encode_fr, decode_fr];
})();
