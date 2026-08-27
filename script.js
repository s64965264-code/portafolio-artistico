const artworks = [{"title":"Dibujo cromático: 22 / Enero","date":"22 de enero","month":"Enero","technique":"Retrato cromático","room":"Sala I","desc":"Retrato trabajado con una paleta fría y contraste expresivo, pensado como apertura de la muestra.","src":"assets/obra-original-01.jpg","alt":"Retrato ExÃ³tico en Tonos FrÃ­os"},{"title":"Mi dibujo y yo: 11 / Febrero","date":"11 de febrero","month":"Febrero","technique":"Paisaje","room":"Sala II","desc":"Paisaje de montaña con cascada y detalles naturales, presentado como una escena de encuentro personal con el dibujo.","src":"assets/obra-original-02.jpg","alt":"Paisaje con Cascada en la Naturaleza"},{"title":"Dibujo con figuras geométricas: 19 / Febrero","date":"19 de febrero","month":"Febrero","technique":"Mosaico y geometría","room":"Sala II","desc":"Composición marina con medusa y estrellas de mar construida desde formas geométricas y ritmo visual.","src":"assets/obra-original-03.jpg","alt":"Mosaico Marino"},{"title":"Mi personaje: 27 / Febrero","date":"27 de febrero","month":"Febrero","technique":"Boceto a lápiz","room":"Sala II","desc":"Personaje de línea suave y cabello ondulado, tratado como exploración de identidad y gesto.","src":"assets/obra-original-04.jpg","alt":"Retrato Lineal de una Joven"},{"title":"Proyecto 1: 4 / Marzo","date":"4 de marzo","month":"Marzo","technique":"Paisaje cromático","room":"Sala III","desc":"Escena de atardecer sobre el monte, con profundidad atmosférica y lectura cálida del paisaje.","src":"assets/obra-original-01.png","alt":"Sendero de Agua hacia el Atardecer"},{"title":"Puntos de fuga: 22 / Abril","date":"22 de abril","month":"Abril","technique":"Perspectiva","room":"Sala IV","desc":"Ejercicio de perspectiva con figuras geométricas en volumen y estructura espacial marcada.","src":"assets/obra-original-05.jpg","alt":"Perspectiva de Cuerpos GeomÃ©tricos"},{"title":"Ilusión óptica: 22 / Abril","date":"22 de abril","month":"Abril","technique":"Perspectiva óptica","room":"Sala IV","desc":"Dibujo de ondas y profundidad visual que construye una ilusión óptica mediante repetición y perspectiva.","src":"assets/obra-original-06.jpg","alt":"IlusiÃ³n de Red Tridimensional"},{"title":"Edificio: 30 / Abril","date":"30 de abril","month":"Abril","technique":"Arquitectura","room":"Sala IV","desc":"Perspectiva urbana de edificios, casas y calle, organizada con sensación de recorrido arquitectónico.","src":"assets/obra-original-07.jpg","alt":"Perspectiva de Arquitectura Urbana"}];
        artworks.push(
            {
                title: 'Expresando Sentimientos a Través del Arte Abstracto',
                date: '22 de julio',
                month: 'Julio',
                technique: 'Arte abstracto',
                room: 'Sala V',
                desc: 'Composición sobre lienzo que reúne escenas y símbolos alrededor de un corazón central para explorar emociones a través del color y la pintura.',
                src: 'assets/expresando-sentimientos-arte-abstracto.jpg',
                alt: 'Lienzo abstracto con un corazón central'
            },
            {
                title: 'Muñeco Colgante Articulado',
                date: '5 de agosto',
                month: 'Agosto',
                technique: 'Arte articulado',
                room: 'Sala VI',
                desc: 'Personaje recortado y articulado de cabello rizado, diseñado para colgarse y explorar el movimiento de una figura ilustrada.',
                src: 'assets/muneco-colgante-articulado.jpg',
                alt: 'Muñeca ilustrada de cabello rizado con cuerpo articulado'
            },
            {
                title: 'Creación de personajes – Un mundo, tres personajes',
                date: '12 de agosto',
                month: 'Agosto',
                technique: 'Creación de personajes',
                room: 'Sala VI',
                desc: 'Boceto horizontal que presenta un pequeño universo de personajes con estilos, vestuarios y personalidades diferenciadas.',
                src: 'assets/creacion-de-personajes-un-mundo-tres-personajes.jpg',
                alt: 'Boceto horizontal de varios personajes'
            },
            {
                title: 'Proyecto colaborativo: Mural Pixel Art',
                date: '20 de agosto',
                month: 'Agosto',
                technique: 'Pixel art',
                room: 'Sala VII',
                desc: 'Mural digital colaborativo construido con estética pixel art y una paleta dominada por verdes, con referencias a una galería de obras.',
                src: 'assets/mural-pixel-art.png',
                alt: 'Mural digital en pixel art con predominio de color verde'
            }
        );
        const gallery = document.getElementById('gallery');
        const cards = Array.from(document.querySelectorAll('.art-card'));
        const search = document.getElementById('search');
        const techniqueFilter = document.getElementById('techniqueFilter');
        const monthButtons = Array.from(document.querySelectorAll('.month-button'));
        const count = document.getElementById('resultCount');
        const empty = document.getElementById('empty');
        const modal = document.getElementById('artModal');
        let activeMonth = 'Todos';
        let currentIndex = 0;

        function normalize(value) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
        function applyFilters() {
            const query = normalize(search.value.trim());
            const technique = techniqueFilter.value;
            let visible = 0;
            cards.forEach((card) => {
                const art = artworks[Number(card.dataset.index)];
                const haystack = normalize(`${art.title} ${art.date} ${art.month} ${art.technique} ${art.room} ${art.desc}`);
                const matchesMonth = activeMonth === 'Todos' || art.month === activeMonth;
                const matchesTechnique = technique === 'Todas' || art.technique === technique;
                const matchesSearch = !query || haystack.includes(query);
                const show = matchesMonth && matchesTechnique && matchesSearch;
                card.classList.toggle('hidden', !show);
                if (show) visible += 1;
            });
            count.textContent = `${visible} ${visible === 1 ? 'obra visible' : 'obras visibles'}`;
            empty.classList.toggle('visible', visible === 0);
        }
        function setMonth(month) {
            activeMonth = month;
            monthButtons.forEach((button) => button.classList.toggle('active', button.dataset.month === month));
            applyFilters();
        }
        function openArt(index) {
            currentIndex = index;
            const art = artworks[currentIndex];
            document.getElementById('modalImg').src = art.src;
            document.getElementById('modalImg').alt = art.alt;
            document.getElementById('modalRoom').textContent = art.room;
            document.getElementById('modalTitle').textContent = art.title;
            document.getElementById('modalDate').textContent = art.date;
            document.getElementById('modalTechnique').textContent = art.technique;
            document.getElementById('modalDesc').textContent = art.desc;
            modal.showModal();
        }
        function stepArt(direction) { openArt((currentIndex + direction + artworks.length) % artworks.length); }
        cards.forEach((card) => card.querySelector('.art-open').addEventListener('click', () => openArt(Number(card.dataset.index))));
        monthButtons.forEach((button) => button.addEventListener('click', () => setMonth(button.dataset.month)));
        search.addEventListener('input', applyFilters);
        techniqueFilter.addEventListener('change', applyFilters);
        document.getElementById('viewToggle').addEventListener('click', (event) => {
            gallery.classList.toggle('list');
            event.currentTarget.textContent = gallery.classList.contains('list') ? 'Vista galería' : 'Vista lista';
        });
        document.getElementById('tourButton').addEventListener('click', () => openArt(0));
        document.getElementById('resetButton').addEventListener('click', () => { search.value = ''; techniqueFilter.value = 'Todas'; setMonth('Todos'); });
        document.getElementById('closeModal').addEventListener('click', () => modal.close());
        document.getElementById('prevArt').addEventListener('click', () => stepArt(-1));
        document.getElementById('nextArt').addEventListener('click', () => stepArt(1));
        modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
        document.addEventListener('keydown', (event) => {
            if (!modal.open) return;
            if (event.key === 'ArrowLeft') stepArt(-1);
            if (event.key === 'ArrowRight') stepArt(1);
        });
        applyFilters();
