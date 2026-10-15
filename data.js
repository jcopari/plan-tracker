const STORAGE_KEY = 'joao_50_em_5_master_v2';
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const defaultState = {
  habits: [
    { id: 1, name: 'Leitura Teórica (CS:APP / OSTEP / TLPI / Livros)', days: [true, true, true, false, false, false, false] },
    { id: 2, name: 'Roteiro 42 & Shadow Bootcamps (C / UNIX / C++)', days: [true, true, true, false, false, false, false] },
    { id: 3, name: 'Implementação de Estruturas de Dados (Níveis 0–15)', days: [false, true, true, false, false, false, false] },
    { id: 4, name: 'CS:APP Labs & Reverse Engineering (GDB / Valgrind)', days: [true, false, true, false, false, false, false] },
    { id: 5, name: 'Projetos da Trilha & Projetos de Impacto (ft_*)', days: [false, true, false, false, false, false, false] }
  ],
  masterSteps: [
    { step: 1, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: '42', name: '42 (Fases 0 e 1): Shell 00/01 até C 13 + Libft (Arrays, ponteiros, structs, FDs, listas e árvores)', progress: 100, done: true },
    { step: 2, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'CSAPP', name: 'CSAPP Lab: Data Lab (Puzzles lógicos com operadores bitwise)', progress: 100, done: true },
    { step: 3, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 01: Compressor Huffman (Árvores e manipulação de bits)', progress: 0, done: false },
    { step: 4, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: '42', name: '42 (Rank 1): ft_printf e get_next_line (Variadic functions e buffers estáticos)', progress: 0, done: false },
    { step: 5, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'CSAPP', name: 'CSAPP Lab: Bomb Lab & Attack Lab (Assembly x86_64, buffer overflow e injeção)', progress: 0, done: false },
    { step: 6, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'CSAPP', name: 'CSAPP Lab: Malloc Lab (Alocador de memória com listas de blocos livres)', progress: 0, done: false },
    { step: 7, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 02: Alocador de Memória (malloc/free customizado com brk/mmap)', progress: 0, done: false },
    { step: 8, phase: 'Fase 1: Fundações, Bits e Memória Manual', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_redis (SDS strings, tabelas hash, event loop com io_uring e thread pool)', progress: 0, done: false },
    { step: 9, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: '42', name: '42 (Rank 2): Born2beroot (SysAdmin, Linux) + push_swap + minitalk (Sinais UNIX)', progress: 0, done: false },
    { step: 10, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: '42', name: '42 (Rank 3): pipex (Redirecionamento, IPC e pipes)', progress: 0, done: false },
    { step: 11, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: 'CSAPP', name: 'CSAPP Lab: Shell Lab (Controle de jobs, sinais e processos)', progress: 0, done: false },
    { step: 12, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: '42', name: '42 (Rank 3): minishell (Arquitetura de shell e execução)', progress: 0, done: false },
    { step: 13, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 05: Shell Unix Customizado (Background jobs e parsing avançado)', progress: 0, done: false },
    { step: 14, phase: 'Fase 2: Sistema Operacional, Kernel e Processos', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_docker (Runtime do zero usando clone, namespaces, cgroups e OverlayFS)', progress: 0, done: false },
    { step: 15, phase: 'Fase 3: Concorrência e Persistência em Disco', type: '42', name: '42 (Rank 3): philosophers (Threads POSIX, mutex e prevenção de deadlocks)', progress: 0, done: false },
    { step: 16, phase: 'Fase 3: Concorrência e Persistência em Disco', type: 'CSAPP', name: 'CSAPP Lab: Cache Lab (Hierarquia de memória, simulação de cache e cache misses)', progress: 0, done: false },
    { step: 17, phase: 'Fase 3: Concorrência e Persistência em Disco', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 04: Banco de Dados em Disco (Pager binário e introdução a páginas)', progress: 0, done: false },
    { step: 18, phase: 'Fase 3: Concorrência e Persistência em Disco', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_sqlite (B+Tree em disco, paginação 4KB, cache LRU e WAL tolerante a falhas)', progress: 0, done: false },
    { step: 19, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: '42', name: '42 (Rank 5): NetPractice (Roteamento e subnetting)', progress: 0, done: false },
    { step: 20, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 03: Servidor HTTP & Sniffer RAW (+ Core em Go: POSIX Threads vs Goroutines)', progress: 0, done: false },
    { step: 21, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: 'CSAPP', name: 'CSAPP Lab: Proxy Lab (Proxy HTTP básico com threads/I/O)', progress: 0, done: false },
    { step: 22, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_tcpip (Pilha TCP/IP user-space via TUN/TAP: ARP, IPv4 e handshake TCP)', progress: 0, done: false },
    { step: 23, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: '42', name: '42 (Rank 5): webserv/ft_irc (Servidores non-blocking em C++)', progress: 0, done: false },
    { step: 24, phase: 'Fase 4: Redes (Do Baixo Nível ao C10K)', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_nginx (Proxy reverso assíncrono com epoll, parsing zero-copy e C10K)', progress: 0, done: false },
    { step: 25, phase: 'Fase 5: Compiladores, Arquitetura e Eng. de Software', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 06: Réplica Funcional do Git (Merkle trees, hashing SHA e compressão zlib)', progress: 0, done: false },
    { step: 26, phase: 'Fase 5: Compiladores, Arquitetura e Eng. de Software', type: 'PROJ-BASE', name: 'Trilha Base - Projeto 07: Compilador & VM Básica (AST e geração de bytecode em Rust/C)', progress: 0, done: false },
    { step: 27, phase: 'Fase 5: Compiladores, Arquitetura e Eng. de Software', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_vm (Linguagem própria, ISA custom, dispatch loop, GC Mark-and-Sweep e JIT x86_64)', progress: 0, done: false },
    { step: 28, phase: 'Fase 6: Sistemas Distribuídos e o Bare-Metal', type: '42', name: '42 (Rank 6): ft_transcendence (Full Stack / WebSockets + K3s/Minikube + OpenTelemetry/Prometheus/Jaeger)', progress: 0, done: false },
    { step: 29, phase: 'Fase 6: Sistemas Distribuídos e o Bare-Metal', type: 'IMPACTO', name: 'PROJETO DE IMPACTO: ft_raft (Consenso distribuído em Go/Rust, eleição de líder e partição de rede)', progress: 0, done: false },
    { step: 30, phase: 'Fase 6: Sistemas Distribuídos e o Bare-Metal', type: 'CHEFE-FINAL', name: 'Trilha Base - Projeto 08 (O Chefe Final): Sistema Operacional do Zero no QEMU (Bootloader x86, IDT/GDT, scheduler)', progress: 0, done: false }
  ],
  route42: [
    { id: '42-1', phase: 'FASE 0: O Ambiente (Shell & CLI)', kind: '42', name: 'Shell 00 (Permissões e Filesystem)', done: true },
    { id: '42-2', phase: 'FASE 0: O Ambiente (Shell & CLI)', kind: '42', name: 'Shell 01 (Scripting e Environment)', done: true },
    { id: '42-3', phase: 'FASE 0: O Ambiente (Shell & CLI)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Git & Workflow Automation', done: true },
    { id: '42-4', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 00 (Sintaxe Básica)', done: true },
    { id: '42-5', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 01 (Ponteiros e Aritmética)', done: true },
    { id: '42-6', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 02 (Strings e Manipulação de Bytes)', done: true },
    { id: '42-7', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 03 (Manipulação de Strings Avançada)', done: true },
    { id: '42-8', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 04 (Parsing, Conversão e Endianness)', done: true },
    { id: '42-9', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 05 (Matemática e Recursão)', done: true },
    { id: '42-10', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 06 (Argumentos argc/argv)', done: true },
    { id: '42-11', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Pointers & Memory Layout (Stack vs Heap)', done: true },
    { id: '42-12', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 07 (Alocação Dinâmica malloc/free)', done: true },
    { id: '42-13', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 08 (Headers, Structs e Defines)', done: true },
    { id: '42-14', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 09 (Makefiles e Bibliotecas)', done: true },
    { id: '42-15', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 10 (File Descriptors e I/O)', done: true },
    { id: '42-16', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 11 (Function Pointers e Callbacks)', done: true },
    { id: '42-17', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'Piscine Reloaded (Revisão Técnica)', done: true },
    { id: '42-18', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'Libft (Parte Obrigatória)', done: true },
    { id: '42-19', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 12 (Listas Encadeadas)', done: false },
    { id: '42-20', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'C 13 (Árvores Binárias)', done: false },
    { id: '42-21', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Estruturas de Dados Lineares (Lists/Vectors)', done: false },
    { id: '42-22', phase: 'FASE 1: A Base de Aço (C e Memória)', kind: '42', name: 'Libft (Parte Bônus)', done: false },
    { id: '42-23', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'ft_printf (Variadic Functions)', done: false },
    { id: '42-24', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'Get_next_line (Buffers Estáticos e FDs)', done: false },
    { id: '42-25', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: 'BOOTCAMP', name: '[BOOTCAMP] SysAdmin Basics (LVM, SSH, Permissions)', done: false },
    { id: '42-26', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'Born2beroot (Virtualização e Linux)', done: false },
    { id: '42-27', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Graphics & Math Basics (MiniLibX/Vetores)', done: false },
    { id: '42-28', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'So_long / FdF / Fract-ol (Gráficos e Eventos)', done: false },
    { id: '42-29', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Análise de Algoritmos (Big O & Sorts)', done: false },
    { id: '42-30', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Abstract Data Types (Stacks & Queues)', done: false },
    { id: '42-31', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'Push_swap (Complexidade Algorítmica)', done: false },
    { id: '42-32', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Bitwise Operations (Máscaras e Binário)', done: false },
    { id: '42-33', phase: 'FASE 2: Sistema e Algoritmos (Rank 1 & 2)', kind: '42', name: 'Minitalk (Sinais UNIX - SIGUSR)', done: false },
    { id: '42-34', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Unix Processes (Fork, Pipe, Execve)', done: false },
    { id: '42-35', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: '42', name: 'Pipex (Redirecionamento e Pipes)', done: false },
    { id: '42-36', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Parsers & AST (Lexers e Tokenização)', done: false },
    { id: '42-37', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: '42', name: 'Minishell (Processos e Shell Architecture)', done: false },
    { id: '42-38', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Concorrência & Threads (Mutex/Semaphores)', done: false },
    { id: '42-39', phase: 'FASE 3: Arquitetura UNIX (Rank 3)', kind: '42', name: 'Philosophers (Threads e Data Races)', done: false },
    { id: '42-40', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: 'BOOTCAMP', name: '[BOOTCAMP] C++ Paradigm Shift (OOP Concepts)', done: false },
    { id: '42-41', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: '42', name: 'CPP Module 00 (Namespaces e Classes)', done: false },
    { id: '42-42', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: '42', name: 'CPP Module 01 (Alocação e Referências)', done: false },
    { id: '42-43', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: '42', name: 'CPP Module 02 (Polimorfismo Ad-hoc e Operadores)', done: false },
    { id: '42-44', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: '42', name: 'CPP Module 03 (Herança)', done: false },
    { id: '42-45', phase: 'FASE 4: Orientação a Objetos (Rank 4)', kind: '42', name: 'CPP Module 04 (Subtipos e Interfaces)', done: false },
    { id: '42-46', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'CPP Module 05 (Exceptions)', done: false },
    { id: '42-47', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'CPP Module 06 (Casting e RTTI)', done: false },
    { id: '42-48', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'CPP Module 07 (Templates)', done: false },
    { id: '42-49', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'CPP Module 08 (STL Containers & Algorithms)', done: false },
    { id: '42-50', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'CPP Module 09 (STL Avançado)', done: false },
    { id: '42-51', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Networking Fundamentals (TCP/IP)', done: false },
    { id: '42-52', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'NetPractice (Roteamento e Subnetting)', done: false },
    { id: '42-53', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: 'BOOTCAMP', name: '[BOOTCAMP] I/O Multiplexing (Select/Poll/Epoll)', done: false },
    { id: '42-54', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'Webserv/ft_irc (Servidores HTTP/IRC Non-blocking)', done: false },
    { id: '42-55', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: 'BOOTCAMP', name: '[BOOTCAMP] DevOps & Containerization', done: false },
    { id: '42-56', phase: 'FASE 5: Advanced C++ & Infra (Rank 5)', kind: '42', name: 'Inception (Docker Orchestration)', done: false },
    { id: '42-57', phase: 'FASE 6: Engenharia Full Stack (Rank 6)', kind: 'BOOTCAMP', name: '[BOOTCAMP] Modern Web Stack (Frameworks/Auth/DB)', done: false },
    { id: '42-58', phase: 'FASE 6: Engenharia Full Stack (Rank 6)', kind: '42', name: 'ft_transcendence (SPA, WebSockets e OAuth)', done: false }
  ],
  csappGates: [
    { id: 'cs-1', title: 'Fase 1: Fundamentos de Bits', reading: 'Cap 1 (Tour) + Cap 2 (Inteiros e Floats)', readDone: true, labs: [{ name: 'Data Lab (Bitwise Puzzles)', done: true }], note: 'Bloqueio: Não avance ao Cap 3 sem zerar o Data Lab.' },
    { id: 'cs-2', title: 'Fase 2: A Máquina (O Grande Filtro)', reading: 'Cap 3 (Assembly x86-64)', readDone: false, labs: [{ name: 'Bomb Lab (Reverse Eng GDB)', done: false }, { name: 'Attack Lab (Buffer Overflow / ROP)', done: false }], note: 'Onde a maioria desiste. Domine o GDB e o layout da stack.' },
    { id: 'cs-3', title: 'Fase 3: Bifurcação de Arquitetura (Bypass Tático)', reading: 'Cap 4 (Processor Architecture)', readDone: false, bypassed: true, labs: [{ name: 'Arch Lab (HCL CPU Design)', done: false }], note: 'Otimização: Pule inicialmente se o foco for Software/Performance e volte no final.' },
    { id: 'cs-4', title: 'Fase 4: Performance Real (O Ouro do Programador)', reading: 'Cap 5 (Otimização) + Cap 6 (Hierarquia de Memória/Cache)', readDone: false, labs: [{ name: 'Cache Lab (Simulador de Cache & Misses)', done: false }], note: 'Aqui você aprende por que seu código é lento.' },
    { id: 'cs-5', title: 'Fase 5: Sistema Operacional (Kernel)', reading: 'Cap 7 (Linking) + Cap 8 (Exceções/Processos) + Cap 9 (Memória Virtual)', readDone: false, labs: [{ name: 'Shell Lab (Unix Shell)', done: false }, { name: 'Malloc Lab (Alocador Dinâmico)', done: false }], note: 'Malloc Lab é o exame mais difícil do curso.' },
    { id: 'cs-6', title: 'Fase 6: Redes & Concorrência (Ano 2 / Ano 3)', reading: 'Cap 10 (System I/O) + Cap 11 (Network) + Cap 12 (Concurrency)', readDone: false, labs: [{ name: 'Proxy Lab (Concorrência e Sockets)', done: false }], note: 'Ponte direta para o ft_tcpip e Webserv.' }
  ],
  dsLevels: [
    { level: 'Nível 0 - Fundamentos', year: 'Ano 1', items: [
      { name: 'Array/vetor estático, string (array de chars)', done: true },
      { name: 'Registro/struct, tupla', done: true },
      { name: 'Lista de arrasto / array dinâmico (vector)', done: true }
    ]},
    { level: 'Nível 1 - Lineares Clássicas', year: 'Ano 1', items: [
      { name: 'Lista ligada (simples, dupla, circular)', done: true },
      { name: 'Pilha (stack)', done: true },
      { name: 'Fila (queue), deque', done: false }
    ]},
    { level: 'Nível 2 - Utilitárias Essenciais', year: 'Ano 1', items: [
      { name: 'Tabela hash / dicionário / set (aberta/fechada)', done: false },
      { name: 'Heap binário / priority queue', done: false },
      { name: 'Multiconjuntos (bag/multiset)', done: false }
    ]},
    { level: 'Nível 3 - Árvores e Básicos de Desempenho', year: 'Ano 1', items: [
      { name: 'Árvore binária e BST não balanceada', done: false },
      { name: 'Trie (prefix tree), Radix/Patricia', done: false },
      { name: 'DSU / Union-Find (disjoint set)', done: false },
      { name: 'Skip list', done: false }
    ]},
    { level: 'Nível 4 - Árvores Balanceadas', year: 'Ano 1', items: [
      { name: 'AVL, Red-Black, 2-3, 2-3-4', done: false },
      { name: 'Treap, Splay (auto-ajuste)', done: false },
      { name: 'Order-Statistic Tree (BST + seleção por ordem)', done: false }
    ]},
    { level: 'Nível 5 - Heaps e Árvores de Intervalo', year: 'Ano 2', items: [
      { name: 'Fenwick / BIT (Binary Indexed Tree)', done: false },
      { name: 'Segment Tree (básica)', done: false },
      { name: 'Interval Tree, Segment Tree com coord. comprimidas', done: false },
      { name: 'Binomial heap, Pairing heap', done: false }
    ]},
    { level: 'Nível 6 - Grafos (Representações e Auxiliares)', year: 'Ano 2', items: [
      { name: 'Lista de adjacência, matriz de adjacência, CSR/CSC', done: false },
      { name: 'Estruturas p/ caminhos mínimos (d-ary heap)', done: false },
      { name: 'Euler tour + RMQ (para LCA simples)', done: false }
    ]},
    { level: 'Nível 7 - Árvores e Estruturas em Disco', year: 'Ano 2', items: [
      { name: 'B-Tree, B+-Tree, B*-Tree, 2-3-B-Tree', done: false },
      { name: 'Árvores para bancos de dados/FS (índices on-disk)', done: false }
    ]},
    { level: 'Nível 8 - Espaciais e Geométricas', year: 'Ano 3', items: [
      { name: 'k-d tree, Quadtree, Octree', done: false },
      { name: 'R-Tree / R*-Tree (dados espaciais)', done: false },
      { name: 'Range tree, Interval Skip List', done: false },
      { name: 'DCEL (estruturas de malha/planar)', done: false }
    ]},
    { level: 'Nível 9 - Texto e Compressão de Informação', year: 'Ano 3', items: [
      { name: 'Suffix Array + LCP, Suffix Tree', done: false },
      { name: 'Suffix Automaton (SAM)', done: false },
      { name: 'Wavelet Tree / Wavelet Matrix', done: false },
      { name: 'Bitvectors com rank/select, estruturas sucintas', done: false }
    ]},
    { level: 'Nível 10 - Segment/Range Avançado e Persistência', year: 'Ano 3', items: [
      { name: 'Segment Tree com lazy propagation', done: false },
      { name: 'Segment Tree persistente, Fenwick multidimensional', done: false },
      { name: 'Árvores de ordem/persistentes (Treap persistente)', done: false }
    ]},
    { level: 'Nível 11 - Árvores Dinâmicas para Grafos', year: 'Ano 4', items: [
      { name: 'Link-Cut Trees, Euler Tour Trees, Top Trees', done: false },
      { name: 'ETT + estruturas para conectividade dinâmica', done: false }
    ]},
    { level: 'Nível 12 - Dicionários Super-Rápidos (Inteiros)', year: 'Ano 4', items: [
      { name: 'van Emde Boas (vEB) tree', done: false },
      { name: 'x-fast trie, y-fast trie', done: false },
      { name: 'Fusion tree', done: false }
    ]},
    { level: 'Nível 13 - Probabilísticas e Streaming', year: 'Ano 4', items: [
      { name: 'Bloom Filter, Counting Bloom, Cuckoo Filter', done: false },
      { name: 'Count-Min Sketch, HyperLogLog, Reservoir Sampling', done: false },
      { name: 'MinHash / LSH (similaridade)', done: false }
    ]},
    { level: 'Nível 14 - Edição de Texto / Sequências Mutáveis', year: 'Ano 4', items: [
      { name: 'Rope, Gap Buffer, Piece Table, Finger Tree', done: false }
    ]},
    { level: 'Nível 15 - Concorrentes e de Alto Desempenho', year: 'Ano 4', items: [
      { name: 'Filas/pilhas lock-free, hash map concorrente', done: false },
      { name: 'LSM-Tree (SSTables), Bε-Tree, BW-Tree', done: false },
      { name: 'Estruturas copy-on-write / persistentes em produção', done: false }
    ]}
  ],
  books: [
    { id: 'b-csapp', year: 'Ano 1 & 2', title: 'CS:APP (Computer Systems: A Programmer\'s Perspective)', read: 2, total: 12 },
    { id: 'b-ostep', year: 'Ano 1', title: 'Operating Systems: Three Easy Pieces (OSTEP)', read: 14, total: 50 },
    { id: 'b-llp', year: 'Ano 1', title: 'Low-Level Programming (C, ASM & Intel 64 - Igor Zhirkov)', read: 3, total: 17 },
    { id: 'b-tlpi', year: 'Ano 2', title: 'The Linux Programming Interface (TLPI)', read: 8, total: 64 },
    { id: 'b-kurose', year: 'Ano 2', title: 'Computer Networking: A Top-Down Approach (Kurose)', read: 0, total: 8 },
    { id: 'b-concgo', year: 'Ano 2', title: 'Concurrency in Go (Katherine Cox-Buday)', read: 0, total: 6 },
    { id: 'b-tanenbaum-mos', year: 'Ano 3', title: 'Sistemas Operacionais Modernos 5ª Ed (Tanenbaum)', read: 3, total: 13 },
    { id: 'b-tanenbaum-minix', year: 'Ano 3 & 4', title: 'Sistemas Operacionais: Projeto e Implementação (MINIX 3)', read: 1, total: 6 },
    { id: 'b-dragon', year: 'Ano 3', title: 'Compilers: Principles, Techniques, and Tools (Dragon Book)', read: 0, total: 12 },
    { id: 'b-skiena', year: 'Ano 3', title: 'The Algorithm Design Manual 3rd Ed (Skiena)', read: 0, total: 19 },
    { id: 'b-rust', year: 'Ano 3', title: 'The Rust Programming Language (Rust Book)', read: 0, total: 21 },
    { id: 'b-ddia', year: 'Ano 4', title: 'Designing Data-Intensive Applications (DDIA - Kleppmann)', read: 0, total: 12 },
    { id: 'b-hennessy', year: 'Ano 4', title: 'Computer Architecture: A Quantitative Approach (6th Ed)', read: 0, total: 7 },
    { id: 'b-ddd', year: 'Ano 4', title: 'Domain-Driven Design (DDD - Eric Evans)', read: 0, total: 17 },
    { id: 'b-k8s', year: 'Ano 4', title: 'Kubernetes in Action (Marko Luksa)', read: 0, total: 18 },
    { id: 'b-sysperf', year: 'Ano 5', title: 'Systems Performance: Enterprise and the Cloud (Brendan Gregg)', read: 0, total: 16 },
    { id: 'b-sre', year: 'Ano 5', title: 'Site Reliability Engineering (Google SRE Book)', read: 0, total: 34 }
  ],
  yearsPlan: [
    {
      year: 'Ano 1: O Metal, C e Estruturas de Dados Fundamentais',
      focus: 'CS:APP (caps. 1 a 6), OSTEP (Virtualização) e Low-Level Programming.',
      curriculum: 'Fases 0, 1 e 2 do Roteiro 42 (Piscina, Libft, ft_printf, get_next_line, Born2beroot, Push_swap e Minitalk).',
      ds: 'Níveis 0 a 4 (Arrays, Listas, Pilhas, Filas, Hash, Heaps, Árvores BST/AVL/Red-Black).',
      labs: 'Data Lab, Bomb Lab, Attack Lab (+ Malloc Lab na sequência de projetos).',
      projects: 'Projeto 01 (Compressor Huffman), Projeto 02 (Alocador malloc/free) e ft_redis.'
    },
    {
      year: 'Ano 2: Arquitetura UNIX, Concorrência e Redes de Baixo Nível',
      focus: 'The Linux Programming Interface (TLPI), CS:APP (caps. 8 a 12), Redes (Kurose) e Concurrency in Go.',
      curriculum: 'Fases 3 e 4 do Roteiro 42 (Pipex, Minishell, Philosophers, C++ Modules 00 a 04).',
      ds: 'Níveis 5 a 7 (Fenwick/Segment Trees, Grafos e B-Trees).',
      labs: 'Cache Lab, Shell Lab, Malloc Lab.',
      projects: 'Projeto 03 (Servidor HTTP + Sniffer RAW + Core em Go), Projeto 05 (Shell Unix Customizado) e ft_docker.'
    },
    {
      year: 'Ano 3: Sistemas Operacionais, Compiladores e Armazenamento em Disco',
      focus: 'Sistemas Operacionais Modernos (Tanenbaum), Compilers (Dragon Book), Algorithm Design Manual (Skiena) e The Rust Book.',
      curriculum: 'Fase 5 do Roteiro 42 (C++ Modules 05 a 09, NetPractice, Webserv/ft_irc, Inception).',
      ds: 'Níveis 8 a 10 (Espaciais k-d/Quadtrees, Suffix Arrays, Range Trees e persistência B-Trees/B+-Trees).',
      labs: 'Proxy Lab.',
      projects: 'Projeto 04 (DB em Disco), ft_sqlite, Projeto 06 (Réplica do Git), Projeto 07 (Compilador & VM em Rust) e ft_vm (JIT x86_64).'
    },
    {
      year: 'Ano 4: Sistemas Distribuídos, Escala e Ecossistema Cloud Native',
      focus: 'DDIA (Kleppmann), Computer Architecture (Hennessy & Patterson), DDD, Kubernetes in Action + Docs etcd/Kafka.',
      curriculum: 'Fase 6 do Roteiro 42 (ft_transcendence) + consenso distribuído.',
      ds: 'Níveis 11 a 15 (Link-Cut, vEB, Probabilísticas Bloom/HyperLogLog, Rope, Lock-free e LSM-Trees).',
      labs: 'Orquestração K3s/Minikube + Raft.',
      projects: 'Projeto 08 (O Chefe Final: SO do Zero no QEMU), ft_raft (Consenso Distribuído), ft_tcpip e ft_nginx.'
    },
    {
      year: 'Ano 5: Engenharia de Performance, SRE, System Design e Preparação FAANG',
      focus: 'Google SRE Book (SLOs/SLIs) e Systems Performance (Brendan Gregg).',
      curriculum: 'LeetCode intensivo (Grafos, DP, Treaps), Simulações de System Design Global (CAP/PACELC, Sharding).',
      ds: 'Revisão competitiva e aplicação de estruturas de Níveis 0 a 15 sob pressão de tempo.',
      labs: 'Instrumentação OpenTelemetry, Prometheus, Jaeger/Grafana e profiling com perf.',
      projects: 'Documentação em inglês dos 8 projetos + ft_*, benchmarks de kernel/memória, Open-Source e Mock Interviews.'
    }
  ]
};