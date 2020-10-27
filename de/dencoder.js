[encode_de, decode_de] = (() => {
	let raw_table = `а a
ä 'a
b b
c c
d d
e e
f f
g g
h h
i i
j j
k k
l l
m m
n n
o o
ö 'o
p p
q q
r r
s s
ß 's
t t
u u
ü 'u
v v
w w
x x
y y
' ''`;

	let table_de_en = new Map();
	let table_en_de = new Map();

	for (let it of raw_table.split("\n")){
		let parts = it.split(" ");
		table_de_en.set(parts[0], parts[1]);
		table_en_de.set(parts[1], parts[0]);
	}

	let encode_de = (str) => {
		let ret = [];

		for (let char of str){
			if (table_de_en.has(char)){
				ret.push(table_de_en.get(char));
			}
			else{
				ret.push(char);
			}
		}
		return ret.join("");
	};

	let decode_de = (str) => {
		let ret = [];

		for (let i = 0; i < str.length; ++i){
			if (str.charAt(i) == "'"){
				if (i + 1 >= str.length || !table_en_de.has(str.substr(i, 2))){
					return null;
				}
				ret.push(table_en_de.get(str.substr(i, 2)));
				++i;
			}
			else if (table_en_de.has(str.charAt(i))){
				ret.push(table_en_de.get(str.charAt(i)));
			}
			else{
				ret.push(str.charAt(i));
			}
		}
		return ret.join("");
	};

	return [encode_de, decode_de];
})();
