<?php

namespace App\Services;

use App\Enums\TestTiers;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class TestResultGenerator
{
    /**
     * Generate test results based on questions, answers, and test tier.
     *
     * @param Collection $questions Collection of Question models
     * @param TestTiers $tier Test tier (free, top, premium)
     * @return array Structured test results
     */
    public function generate(Collection $questions, TestTiers $tier): array
    {
        $prompt = $this->buildPrompt($questions);

        // Simulate LLM API request
        $response = $this->callLLMApi($prompt, $tier);

        return $response;
    }

    /**
     * Build the prompt from questions and answers.
     *
     * @param Collection $questions
     * @return string
     */
    private function buildPrompt(Collection $questions): string
    {
        $questionsAndAnswers = $questions
            ->map(fn($question) => [
                'number' => $question->number,
                'question' => $question->question,
                'answer' => $question->answer,
            ])
            ->values()
            ->toArray();

        return json_encode([
            'instructions' => 'Analyze the following personality test responses and generate career recommendations.',
            'responses' => $questionsAndAnswers,
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Simulate calling an LLM API.
     *
     * @param string $prompt
     * @param TestTiers $tier
     * @return array
     */
    private function callLLMApi(string $prompt, TestTiers $tier): array
    {
        // Simulate API latency
        sleep(6);

        // TODO: Replace with actual LLM API call
        // Example:
        // $response = Http::timeout(60)->post('https://api.llm-provider.com/generate', [
        //     'prompt' => $prompt,
        //     'tier' => $tier->value,
        // ]);
        // return $response->json();

        return $this->getMockResponse($tier);
    }

    /**
     * Get mock response based on tier.
     *
     * @param TestTiers $tier
     * @return array
     */
    private function getMockResponse(TestTiers $tier): array
    {
        return match ($tier) {
            TestTiers::FREE => $this->getFreeResponse(),
            TestTiers::TOP => $this->getTopResponse(),
            TestTiers::PREMIUM => $this->getPremiumResponse(),
        };
    }

    /**
     * Generate free tier response.
     *
     * @return array
     */
    private function getFreeResponse(): array
    {
        return [
            'personalityItems' => null,
            'personalityDescription' => 'Вы обладаете активностью и межличностной ориентацией, склонностью к творчеству и инициативе. Ваши ответы указывают на интерес к искусству, культуре и людским взаимодействиям. Вы умеете проявлять инициативу в творческих сферах и вам нравится делиться своими идеями, что говорит о желании развиваться и искать новые возможности. При этом у вас есть склонность к практической деятельности, вы заинтересованы в профессиях, связанных с работой руками и техническим оборудованием, а также вам важна стабильность в карьере. Вы можете успешно реализовать себя в сферах, требующих аккуратности и ответственности. В тоже время, у вас есть вопросы или неуверенность относительно эмоциональных и коммуникативных аспектов, а также о работе в командной обстановке. ',
            'jobs' => [
                $this->createJob(
                    'Веб-разработчик',
                    'Создание и поддержка веб-приложений с использованием современных технологий',
                    120000,
                    'Очень высокая',
                    85
                ),
                $this->createJob(
                    'UX/UI Дизайнер',
                    'Проектирование пользовательских интерфейсов и улучшение пользовательского опыта',
                    100000,
                    'Высокая',
                    78
                ),
                $this->createJob(
                    'Менеджер проектов',
                    'Координация команды и управление проектами от начала до завершения',
                    110000,
                    'Высокая',
                    72
                ),
                ...array_fill(0, 7, null),
            ],
            'charts' => [
                $this->createChart('Логическое мышление', 82),
                $this->createChart('Креативность', 75),
                $this->createChart('Коммуникабельность', 68),
                $this->createChart('Лидерство', 65),
                $this->createChart('Техническая экспертиза', 88),
                ...array_fill(0, 5, null),
            ],
            'strengths' => [
                $this->createStrength('Аналитические способности', 90),
                $this->createStrength('Быстрое обучение', 85),
                $this->createStrength('Внимание к деталям', 80),
                $this->createStrength('Системное мышление', 78),
                $this->createStrength('Технические навыки', 88),
                ...array_fill(0, 5, null),
            ],
            'weaknesses' => [
                $this->createWeakness('Перфекционизм', 75),
                $this->createWeakness('Нетерпеливость', 65),
                $this->createWeakness('Сложность делегирования', 60),
                $this->createWeakness('Избегание конфликтов', 55),
                $this->createWeakness('Переработка', 70),
                ...array_fill(0, 5, null),
            ],
            'summary' => null,
            'bestJob' => null,
            'jobAdvice' => null,
            'improvementAdvice' => null,
        ];
    }

    /**
     * Generate top tier response.
     *
     * @return array
     */
    private function getTopResponse(): array
    {
        return [
            'personalityItems' => null,
            'personalityDescription' => 'Вы — амбициозный профессионал с сильными лидерскими качествами. Вы способны мотивировать команду и достигать поставленных целей. Ваш аналитический ум в сочетании с креативностью делает вас ценным специалистом в различных областях.',
            'jobs' => [
                $this->createJob(
                    'Senior Веб-разработчик',
                    'Разработка сложных веб-приложений и менторство младших разработчиков',
                    180000,
                    'Очень высокая',
                    92
                ),
                $this->createJob(
                    'Технический директор',
                    'Стратегическое планирование технологического развития компании',
                    250000,
                    'Высокая',
                    88
                ),
                $this->createJob(
                    'Product Manager',
                    'Управление продуктом от концепции до запуска',
                    160000,
                    'Очень высокая',
                    85
                ),
                $this->createJob(
                    'Архитектор ПО',
                    'Проектирование масштабируемых программных систем',
                    200000,
                    'Высокая',
                    82
                ),
                $this->createJob(
                    'DevOps Engineer',
                    'Автоматизация процессов и управление инфраструктурой',
                    150000,
                    'Очень высокая',
                    78
                ),
                $this->createJob(
                    'Data Scientist',
                    'Анализ больших данных и построение прогнозных моделей',
                    170000,
                    'Очень высокая',
                    75
                ),
                $this->createJob(
                    'UX Research Lead',
                    'Руководство исследованиями пользовательского опыта',
                    140000,
                    'Средняя',
                    72
                ),
                $this->createJob(
                    'Scrum Master',
                    'Фасилитация agile-процессов в команде',
                    130000,
                    'Высокая',
                    68
                ),
                ...array_fill(0, 2, null),
            ],
            'charts' => [
                $this->createChart('Логическое мышление', 90),
                $this->createChart('Креативность', 82),
                $this->createChart('Коммуникабельность', 85),
                $this->createChart('Лидерство', 88),
                $this->createChart('Техническая экспертиза', 92),
                $this->createChart('Стратегическое мышление', 86),
                $this->createChart('Эмоциональный интеллект', 78),
                $this->createChart('Адаптивность', 84),
                ...array_fill(0, 2, null),
            ],
            'strengths' => [
                $this->createStrength('Стратегическое видение', 92),
                $this->createStrength('Технические навыки', 90),
                $this->createStrength('Лидерство', 88),
                $this->createStrength('Решение проблем', 86),
                $this->createStrength('Командная работа', 84),
                ...array_fill(0, 5, null),
            ],
            'weaknesses' => [
                $this->createWeakness('Склонность к переработке', 75),
                $this->createWeakness('Высокие ожидания от других', 70),
                $this->createWeakness('Нетерпеливость к бюрократии', 68),
                $this->createWeakness('Трудность в отключении от работы', 65),
                $this->createWeakness('Перфекционизм в деталях', 72),
                ...array_fill(0, 5, null),
            ],
            'summary' => null,
            'bestJob' => null,
            'jobAdvice' => null,
            'improvementAdvice' => [
                $this->createAdvice('Развивайте навыки публичных выступлений для повышения влияния'),
                $this->createAdvice('Изучите основы финансового менеджмента для понимания бизнес-стороны'),
                $this->createAdvice('Практикуйте делегирование для масштабирования своей эффективности'),
            ],
        ];
    }

    /**
     * Generate premium tier response.
     *
     * @return array
     */
    private function getPremiumResponse(): array
    {
        $bestJob = $this->createJob(
            'Senior Веб-разработчик / Tech Lead',
            'Руководство командой разработки, архитектурные решения, менторство. Работа над высоконагруженными системами с использованием современного стека технологий.',
            200000,
            'Очень высокая',
            95
        );

        return [
            'personalityItems' => [
                $this->createPersonalityItem('Реалистический', 75, 'Практический подход к решению задач, предпочтение конкретных результатов'),
                $this->createPersonalityItem('Исследовательский', 88, 'Аналитическое мышление и стремление к глубокому пониманию'),
                $this->createPersonalityItem('Артистический', 65, 'Креативность и нестандартный подход к решениям'),
                $this->createPersonalityItem('Социальный', 72, 'Навыки коммуникации и работы в команде'),
                $this->createPersonalityItem('Предпринимательский', 85, 'Лидерство и способность к стратегическому мышлению'),
                $this->createPersonalityItem('Конвенциональный', 60, 'Организованность и внимание к деталям'),
            ],
            'personalityDescription' => 'Вы — выдающийся специалист с уникальным сочетанием технических и межличностных навыков. Ваша способность видеть общую картину при внимании к деталям делает вас исключительным лидером. Вы естественным образом вдохновляете других и создаете инновационные решения сложных проблем.',
            'jobs' => [
                $this->createJob(
                    'Senior Веб-разработчик / Tech Lead',
                    'Руководство командой разработки, архитектурные решения, менторство',
                    200000,
                    'Очень высокая',
                    95
                ),
                $this->createJob(
                    'Технический директор (CTO)',
                    'Стратегическое управление технологическим направлением компании',
                    280000,
                    'Высокая',
                    90
                ),
                $this->createJob(
                    'Principal Engineer',
                    'Разработка критически важных систем и технологическое лидерство',
                    230000,
                    'Очень высокая',
                    88
                ),
                $this->createJob(
                    'VP of Engineering',
                    'Управление инженерными командами и процессами разработки',
                    300000,
                    'Средняя',
                    85
                ),
                $this->createJob(
                    'Solutions Architect',
                    'Проектирование комплексных IT-решений для корпоративных клиентов',
                    190000,
                    'Высокая',
                    83
                ),
                $this->createJob(
                    'Product Manager (Technical)',
                    'Управление техническим продуктом с глубоким пониманием технологий',
                    170000,
                    'Очень высокая',
                    80
                ),
                $this->createJob(
                    'Machine Learning Engineer',
                    'Разработка и внедрение ML-моделей в production',
                    195000,
                    'Очень высокая',
                    78
                ),
                $this->createJob(
                    'Security Architect',
                    'Проектирование защищенных систем и обеспечение информационной безопасности',
                    185000,
                    'Высокая',
                    75
                ),
                $this->createJob(
                    'Engineering Manager',
                    'Управление командой разработки и технические решения',
                    175000,
                    'Высокая',
                    72
                ),
                $this->createJob(
                    'Technical Consultant',
                    'Консультирование компаний по технологическим вопросам',
                    165000,
                    'Средняя',
                    70
                ),
            ],
            'charts' => [
                $this->createChart('Логическое мышление', 94),
                $this->createChart('Креативность', 88),
                $this->createChart('Коммуникабельность', 90),
                $this->createChart('Лидерство', 92),
                $this->createChart('Техническая экспертиза', 96),
                $this->createChart('Стратегическое мышление', 91),
                $this->createChart('Эмоциональный интеллект', 85),
                $this->createChart('Адаптивность', 89),
                $this->createChart('Инновационность', 93),
                $this->createChart('Стрессоустойчивость', 87),
            ],
            'strengths' => [
                $this->createStrength('Техническое мастерство', 96),
                $this->createStrength('Стратегическое мышление', 92),
                $this->createStrength('Лидерские качества', 90),
                $this->createStrength('Решение сложных проблем', 94),
                $this->createStrength('Менторство и обучение', 88),
                $this->createStrength('Системное видение', 91),
                $this->createStrength('Инновационный подход', 89),
                $this->createStrength('Коммуникация с stakeholders', 86),
                $this->createStrength('Архитектурное мышление', 93),
                $this->createStrength('Быстрое принятие решений', 87),
            ],
            'weaknesses' => [
                $this->createWeakness('Тенденция к микроменеджменту в стрессовых ситуациях', 72),
                $this->createWeakness('Сложность в делегировании критических задач', 68),
                $this->createWeakness('Высокие стандарты могут создавать напряжение', 70),
                $this->createWeakness('Склонность работать сверхурочно', 75),
                $this->createWeakness('Нетерпимость к некачественному коду', 65),
                $this->createWeakness('Может быть слишком прямолинейным в feedback', 62),
                $this->createWeakness('Трудность переключения между проектами', 60),
                $this->createWeakness('Иногда упускает политические аспекты', 58),
                $this->createWeakness('Перфекционизм в архитектурных решениях', 73),
                $this->createWeakness('Склонность к overthinking в простых ситуациях', 55),
            ],
            'summary' =>
            $this->createSummary('Ваш профиль показывает исключительное сочетание технических и лидерских качеств. Вы способны не только создавать качественный код, но и вести за собой команду, принимать стратегические решения и влиять на технологическое направление всей компании.'),
            'bestJob' => $bestJob,
            'jobAdvice' => [
                $this->createAdvice('Сфокусируйтесь на позициях Tech Lead или Principal Engineer в растущих технологических компаниях, где ваше влияние будет максимальным'),
                $this->createAdvice('Рассмотрите возможность работы в стартапах серии B-C, где есть баланс между стабильностью и возможностью влиять на архитектуру'),
                $this->createAdvice('Развивайте личный бренд через техническое публичное выступление, блоги и open source вклад'),
                $this->createAdvice('Ищите компании с сильной инженерной культурой, где ценится техническое совершенство и инновации'),
            ],
            'improvementAdvice' => [
                $this->createAdvice('Развивайте навыки эффективного делегирования — это ключ к масштабированию вашего влияния и росту команды'),
                $this->createAdvice('Изучите основы бизнес-стратегии и финансов, чтобы лучше понимать контекст технологических решений'),
                $this->createAdvice('Практикуйте эмпатичную коммуникацию при предоставлении feedback, особенно с менее опытными коллегами'),
                $this->createAdvice('Инвестируйте время в понимание организационной динамики и политики — это поможет эффективнее продвигать ваши идеи'),
                $this->createAdvice('Создайте систему work-life balance для предотвращения выгорания и поддержания долгосрочной продуктивности'),
            ],
        ];
    }

    /**
     * Helper methods to create structured data
     */
    private function createPersonalityItem(string $title, int $percent, string $description): array
    {
        return [
            'id' => (string) Str::uuid(),
            'title' => $title,
            'percent' => $percent,
            'description' => $description,
        ];
    }

    private function createJob(
        string $title,
        string $description,
        int $salary,
        string $demand,
        int $percent
    ): array {
        return [
            'id' => (string) Str::uuid(),
            'percent' => $percent,
            'title' => $title,
            'description' => $description,
            'avrSalary' => $salary,
            'demand' => $demand,
        ];
    }

    private function createChart(string $title, int $percent): array
    {
        return [
            'id' => (string) Str::uuid(),
            'title' => $title,
            'percent' => $percent,
        ];
    }

    private function createStrength(string $title, int $percent): array
    {
        return [
            'id' => (string) Str::uuid(),
            'title' => $title,
            'percent' => $percent,
        ];
    }

    private function createWeakness(string $title, int $percent): array
    {
        return [
            'id' => (string) Str::uuid(),
            'title' => $title,
            'percent' => $percent,
        ];
    }

    private function createSummary(string $description): array
    {
        return [
            'id' => (string) Str::uuid(),
            'description' => $description,
        ];
    }

    private function createAdvice(string $description): array
    {
        return [
            'id' => (string) Str::uuid(),
            'description' => $description,
        ];
    }

    /**
     * Build a detailed prompt for DeepSeek based on tier.
     *
     * @param Collection $questions
     * @param TestTiers $tier
     * @return string
     */
    private function buildDeepSeekPrompt(Collection $questions, TestTiers $tier): string
    {
        $questionsAndAnswers = $questions
            ->map(fn($question) => sprintf(
                "Вопрос %d: %s\nОтвет: %s",
                $question->number,
                $question->question,
                $question->answer
            ))
            ->join("\n\n");

        $tierInstructions = match ($tier) {
            TestTiers::FREE => $this->getFreePromptInstructions(),
            TestTiers::TOP => $this->getTopPromptInstructions(),
            TestTiers::PREMIUM => $this->getPremiumPromptInstructions(),
        };

        return <<<PROMPT
    Ты — эксперт по карьерному консультированию и профориентации с глубокими знаниями российского рынка труда. Твоя задача — проанализировать ответы человека на личностный тест и предоставить детальные рекомендации по карьере.

    ВАЖНО: Твой ответ должен быть ТОЛЬКО валидным JSON без каких-либо дополнительных текстов, пояснений или markdown-разметки. Не добавляй ```json в начале или ``` в конце. Только чистый JSON.

    ОТВЕТЫ НА ТЕСТ:
    {$questionsAndAnswers}

    {$tierInstructions}

    ТРЕБОВАНИЯ К КАЧЕСТВУ КОНТЕНТА:
    1. Весь текст должен быть на безупречном русском языке
    2. Описания должны быть конкретными, информативными и персонализированными
    3. Избегай общих фраз типа "вы можете", используй уверенные формулировки
    4. Зарплаты указывай в рублях в месяц (реалистичные для российского рынка 2024-2025)
    5. Проценты должны быть логичными и соответствовать реальной совместимости
    6. Каждый UUID генерируй случайным образом в формате: "550e8400-e29b-41d4-a716-446655440000"

    КРИТИЧЕСКИ ВАЖНО:
    - Ответ должен быть ТОЛЬКО валидным JSON
    - Никаких пояснений до или после JSON
    - Никаких markdown-блоков кода
    - Все строки в кавычках должны быть экранированы правильно
    - Все массивы должны содержать точное количество элементов как указано
    - null должен быть именно null, а не строка "null"

    Начинай свой ответ сразу с открывающей фигурной скобки {
    PROMPT;
    }

    /**
     * Get prompt instructions for free tier.
     */
    private function getFreePromptInstructions(): string
    {
        return <<<INSTRUCTIONS
        ТИП ТЕСТА: FREE (Бесплатный)

        СТРУКТУРА JSON ОТВЕТА:
        {
          "personalityItems": null,
          "personalityDescription": "строка 600-800 символов с максимально детальным описанием",
          "jobs": [
            // РОВНО 3 объекта профессий + 7 null
            {
              "id": "UUID",
              "percent": число от 70 до 95,
              "title": "Название профессии",
              "description": "Краткое описание 80-120 символов",
              "avrSalary": число (зарплата в рублях),
              "demand": "Очень высокая" | "Высокая" | "Средняя" | "Низкая" | "Очень низкая"
            },
            {/* второй объект */},
            {/* третий объект */},
            null, null, null, null, null, null, null
          ],
          "charts": [
            // РОВНО 5 характеристик + 5 null
            {"id": "UUID", "title": "Название качества", "percent": число 60-95},
            {/* еще 4 объекта */},
            null, null, null, null, null
          ],
          "strengths": [
            // РОВНО 5 сильных сторон + 5 null
            {"id": "UUID", "title": "Название сильной стороны", "percent": число 75-95},
            {/* еще 4 объекта */},
            null, null, null, null, null
          ],
          "weaknesses": [
            // РОВНО 5 слабых сторон + 5 null
            {"id": "UUID", "title": "Название слабой стороны", "percent": число 50-75},
            {/* еще 4 объекта */},
            null, null, null, null, null
          ],
          "summary": null,
          "bestJob": null,
          "jobAdvice": null,
          "improvementAdvice": null
        }

        ПРИМЕР ВАЛИДНОГО ОТВЕТА:
        {
          "personalityItems": null,
          "personalityDescription": "Вы обладаете активностью и межличностной ориентацией, склонностью к творчеству и инициативе. Ваши ответы указывают на интерес к искусству, культуре и людским взаимодействиям. Вы умеете проявлять инициативу в творческих сферах и вам нравится делиться своими идеями, что говорит о желании развиваться и искать новые возможности. При этом у вас есть склонность к практической деятельности, вы заинтересованы в профессиях, связанных с работой руками и техническим оборудованием, а также вам важна стабильность в карьере. Вы можете успешно реализовать себя в сферах, требующих аккуратности и ответственности. В тоже время, у вас есть вопросы или неуверенность относительно эмоциональных и коммуникативных аспектов, а также о работе в командной обстановке.",
          "jobs": [
            {
              "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
              "percent": 88,
              "title": "Frontend-разработчик",
              "description": "Создание современных веб-интерфейсов с использованием React, Vue и других фреймворков",
              "avrSalary": 150000,
              "demand": "Очень высокая"
            },
            {
              "id": "b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e",
              "percent": 82,
              "title": "UX/UI Дизайнер",
              "description": "Проектирование интуитивных интерфейсов и улучшение пользовательского опыта",
              "avrSalary": 130000,
              "demand": "Высокая"
            },
            {
              "id": "c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f",
              "percent": 75,
              "title": "Контент-менеджер",
              "description": "Создание и управление контентом для цифровых платформ",
              "avrSalary": 90000,
              "demand": "Средняя"
            },
            null, null, null, null, null, null, null
          ],
          "charts": [
            {"id": "d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a", "title": "Креативность", "percent": 85},
            {"id": "e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b", "title": "Логическое мышление", "percent": 78},
            {"id": "f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c", "title": "Коммуникабельность", "percent": 72},
            {"id": "a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d", "title": "Внимание к деталям", "percent": 80},
            {"id": "b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e", "title": "Адаптивность", "percent": 88},
            null, null, null, null, null
          ],
          "strengths": [
            {"id": "c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f", "title": "Быстрое обучение", "percent": 90},
            {"id": "d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a", "title": "Креативное мышление", "percent": 85},
            {"id": "e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b", "title": "Самоорганизация", "percent": 82},
            {"id": "f2a3b4c5-d6e7-5f6a-9b0c-1d2e3f4a5b6c", "title": "Технические навыки", "percent": 87},
            {"id": "a3b4c5d6-e7f8-6a7b-0c1d-2e3f4a5b6c7d", "title": "Аналитические способности", "percent": 83},
            null, null, null, null, null
          ],
          "weaknesses": [
            {"id": "b4c5d6e7-f8a9-7b8c-1d2e-3f4a5b6c7d8e", "title": "Перфекционизм", "percent": 70},
            {"id": "c5d6e7f8-a9b0-8c9d-2e3f-4a5b6c7d8e9f", "title": "Нетерпеливость", "percent": 65},
            {"id": "d6e7f8a9-b0c1-9d0e-3f4a-5b6c7d8e9f0a", "title": "Избегание рутины", "percent": 68},
            {"id": "e7f8a9b0-c1d2-0e1f-4a5b-6c7d8e9f0a1b", "title": "Трудности с делегированием", "percent": 62},
            {"id": "f8a9b0c1-d2e3-1f2a-5b6c-7d8e9f0a1b2c", "title": "Чувствительность к критике", "percent": 60},
            null, null, null, null, null
          ],
          "summary": null,
          "bestJob": null,
          "jobAdvice": null,
          "improvementAdvice": null
        }
        INSTRUCTIONS;
    }

    /**
     * Get prompt instructions for top tier.
     */
    private function getTopPromptInstructions(): string
    {
        return <<<INSTRUCTIONS
        ТИП ТЕСТА: TOP (Расширенный)

        СТРУКТУРА JSON ОТВЕТА:
        {
          "personalityItems": null,
          "personalityDescription": "строка 600-800 символов с максимально детальным описанием",
          "jobs": [
            // РОВНО 8 объектов профессий + 2 null
            {/* 8 объектов Job */},
            null, null
          ],
          "charts": [
            // РОВНО 8 характеристик + 2 null
            {/* 8 объектов PersonalityChart */},
            null, null
          ],
          "strengths": [
            // РОВНО 5 сильных сторон + 5 null
            {/* 5 объектов Strength */},
            null, null, null, null, null
          ],
          "weaknesses": [
            // РОВНО 5 слабых сторон + 5 null
            {/* 5 объектов Weakness */},
            null, null, null, null, null
          ],
          "summary": null,
          "bestJob": null,
          "jobAdvice": null,
          "improvementAdvice": [
            // Массив из 3-5 советов по развитию
            {"id": "UUID", "description": "Конкретный совет 100-150 символов"}
          ]
        }

        ОСОБЕННОСТИ TOP УРОВНЯ:
        - детальный анализ личности (600-800 символов)
        - 8 профессий вместо 3 (более широкий выбор)
        - 8 характеристик личности (расширенный профиль)
        - Добавлены советы по развитию (improvementAdvice)
        - Зарплаты могут быть выше (учитывай более квалифицированные позиции)

        ПРИМЕР ВАЛИДНОГО ОТВЕТА:
        {
          "personalityItems": null,
          "personalityDescription": "Вы — амбициозный профессионал с выраженными лидерскими качествами. Ваша способность мыслить стратегически сочетается с практическим подходом к реализации идей. Вы эффективны как в самостоятельной работе, так и в роли координатора команды, умеете вдохновлять других и добиваться поставленных целей. При этом у вас есть склонность к практической деятельности, вы заинтересованы в профессиях, связанных с работой руками и техническим оборудованием, а также вам важна стабильность в карьере. Вы можете успешно реализовать себя в сферах, требующих аккуратности и ответственности. В тоже время, у вас есть вопросы или неуверенность относительно эмоциональных и коммуникативных аспектов, а также о работе в командной обстановке.",
          "jobs": [
            {
              "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
              "percent": 92,
              "title": "Team Lead разработки",
              "description": "Руководство командой разработчиков, планирование спринтов, менторство",
              "avrSalary": 250000,
              "demand": "Очень высокая"
            },
            {
              "id": "b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e",
              "percent": 88,
              "title": "Product Manager",
              "description": "Управление разработкой продукта от идеи до запуска",
              "avrSalary": 220000,
              "demand": "Очень высокая"
            },
            {
              "id": "c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f",
              "percent": 85,
              "title": "Архитектор ПО",
              "description": "Проектирование архитектуры сложных программных систем",
              "avrSalary": 280000,
              "demand": "Высокая"
            },
            {
              "id": "d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a",
              "percent": 82,
              "title": "DevOps Engineer",
              "description": "Автоматизация процессов CI/CD и управление инфраструктурой",
              "avrSalary": 200000,
              "demand": "Очень высокая"
            },
            {
              "id": "e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b",
              "percent": 78,
              "title": "Scrum Master",
              "description": "Организация agile-процессов и фасилитация команды",
              "avrSalary": 180000,
              "demand": "Высокая"
            },
            {
              "id": "f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c",
              "percent": 75,
              "title": "Бизнес-аналитик",
              "description": "Анализ требований и взаимодействие с заказчиками",
              "avrSalary": 160000,
              "demand": "Высокая"
            },
            {
              "id": "a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d",
              "percent": 72,
              "title": "Technical Writer",
              "description": "Создание технической документации и руководств",
              "avrSalary": 140000,
              "demand": "Средняя"
            },
            {
              "id": "b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e",
              "percent": 68,
              "title": "QA Lead",
              "description": "Руководство отделом тестирования и контроля качества",
              "avrSalary": 190000,
              "demand": "Высокая"
            },
            null, null
          ],
          "charts": [
            {"id": "c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f", "title": "Лидерство", "percent": 90},
            {"id": "d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a", "title": "Стратегическое мышление", "percent": 88},
            {"id": "e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b", "title": "Коммуникация", "percent": 85},
            {"id": "f2a3b4c5-d6e7-5f6a-9b0c-1d2e3f4a5b6c", "title": "Техническая экспертиза", "percent": 92},
            {"id": "a3b4c5d6-e7f8-6a7b-0c1d-2e3f4a5b6c7d", "title": "Решение проблем", "percent": 87},
            {"id": "b4c5d6e7-f8a9-7b8c-1d2e-3f4a5b6c7d8e", "title": "Эмоциональный интеллект", "percent": 80},
            {"id": "c5d6e7f8-a9b0-8c9d-2e3f-4a5b6c7d8e9f", "title": "Инновационность", "percent": 84},
            {"id": "d6e7f8a9-b0c1-9d0e-3f4a-5b6c7d8e9f0a", "title": "Стрессоустойчивость", "percent": 82},
            null, null
          ],
          "strengths": [
            {"id": "e7f8a9b0-c1d2-0e1f-4a5b-6c7d8e9f0a1b", "title": "Системное мышление", "percent": 92},
            {"id": "f8a9b0c1-d2e3-1f2a-5b6c-7d8e9f0a1b2c", "title": "Управление командой", "percent": 88},
            {"id": "a9b0c1d2-e3f4-2a3b-6c7d-8e9f0a1b2c3d", "title": "Принятие решений", "percent": 85},
            {"id": "b0c1d2e3-f4a5-3b4c-7d8e-9f0a1b2c3d4e", "title": "Менторство", "percent": 83},
            {"id": "c1d2e3f4-a5b6-4c5d-8e9f-0a1b2c3d4e5f", "title": "Бизнес-мышление", "percent": 80},
            null, null, null, null, null
          ],
          "weaknesses": [
            {"id": "d2e3f4a5-b6c7-5d6e-9f0a-1b2c3d4e5f6a", "title": "Склонность к переработке", "percent": 72},
            {"id": "e3f4a5b6-c7d8-6e7f-0a1b-2c3d4e5f6a7b", "title": "Нетерпеливость к медленным процессам", "percent": 68},
            {"id": "f4a5b6c7-d8e9-7f8a-1b2c-3d4e5f6a7b8c", "title": "Высокие требования к себе и другим", "percent": 70},
            {"id": "a5b6c7d8-e9f0-8a9b-2c3d-4e5f6a7b8c9d", "title": "Сложность делегирования", "percent": 65},
            {"id": "b6c7d8e9-f0a1-9b0c-3d4e-5f6a7b8c9d0e", "title": "Недооценка важности отдыха", "percent": 75},
            null, null, null, null, null
          ],
          "summary": null,
          "bestJob": null,
          "jobAdvice": null,
          "improvementAdvice": [
            {
              "id": "c7d8e9f0-a1b2-0c1d-4e5f-6a7b8c9d0e1f",
              "description": "Развивайте навыки публичных выступлений — это усилит ваше влияние как лидера и позволит эффективнее доносить идеи до команды и стейкхолдеров"
            },
            {
              "id": "d8e9f0a1-b2c3-1d2e-5f6a-7b8c9d0e1f2a",
              "description": "Изучите основы финансового менеджмента и бизнес-аналитики для принятия более взвешенных стратегических решений"
            },
            {
              "id": "e9f0a1b2-c3d4-2e3f-6a7b-8c9d0e1f2a3b",
              "description": "Практикуйте техники эффективного делегирования — это ключ к масштабированию вашего влияния и развитию команды"
            },
            {
              "id": "f0a1b2c3-d4e5-3f4a-7b8c-9d0e1f2a3b4c",
              "description": "Внедрите регулярные практики восстановления и work-life balance для предотвращения профессионального выгорания"
            }
          ]
        }
        INSTRUCTIONS;
    }

    /**
     * Get prompt instructions for premium tier.
     */
    private function getPremiumPromptInstructions(): string
    {
        return <<<INSTRUCTIONS
        ТИП ТЕСТА: PREMIUM (Максимальный)

        СТРУКТУРА JSON ОТВЕТА:
        {
            "personalityItems": [
            // РОВНО 6 типов личности по модели Холланда
            {
              "id": "UUID",
              "title": "Тип личности (Реалистический/Исследовательский/Артистический/Социальный/Предпринимательский/Конвенциональный)",
              "percent": число 50-95,
              "description": "Краткое описание проявления этого типа у человека (80-120 символов)"
            }
          ],
          "personalityDescription": "строка 250-350 символов с детальным описанием личности",
          "jobs": [
            // РОВНО 10 объектов профессий (без null)
            {/* 10 полных объектов Job */}
          ],
          "charts": [
            // РОВНО 10 характеристик (без null)
            {/* 10 полных объектов PersonalityChart */}
          ],
          "strengths": [
            // РОВНО 10 сильных сторон (без null)
            {/* 10 полных объектов Strength */}
          ],
          "weaknesses": [
            // РОВНО 10 слабых сторон (без null)
            {/* 10 полных объектов Weakness */}
          ],
          "summary":
            {"id": "UUID", "description": "Параграф 150-200 символов"}
          ,
          "bestJob": {
            // Один объект Job — лучшая рекомендация
            "id": "UUID",
            "percent": 95-98,
            "title": "Название",
            "description": "Расширенное описание 150-200 символов",
            "avrSalary": число,
            "demand": "строка"
          },
          "jobAdvice": [
            // Массив из 4-6 конкретных карьерных советов
            {"id": "UUID", "description": "Совет 120-180 символов"}
          ],
          "improvementAdvice": [
            // Массив из 5-7 советов по личностному развитию
            {"id": "UUID", "description": "Совет 120-180 символов"}
          ]
        }

        ОСОБЕННОСТИ PREMIUM УРОВНЯ:
     - personalityItems — 6 типов личности по модели Холланда (RIASEC)
        - короткое описание личности (250-350 символов)
        - 10 профессий (полный спектр возможностей)
        - 10 характеристик личности (всесторонний анализ)
        - 10 сильных и 10 слабых сторон (глубокий анализ)
        - Общее резюме (summary) — 3-4 параграфа синтеза всей информации
        - bestJob — топовая рекомендация с максимальным процентом совместимости
        - jobAdvice — 4-6 конкретных карьерных рекомендаций
        - improvementAdvice — 5-7 советов по развитию
        - Зарплаты на уровне senior/lead позиций

        ТИПЫ ЛИЧНОСТИ ХОЛЛАНДА (все 6 должны присутствовать):
        1. Реалистический (Realistic) — практическая работа, технические навыки, работа руками
        2. Исследовательский (Investigative) — анализ, наука, решение сложных задач
        3. Артистический (Artistic) — креативность, самовыражение, инновации
        4. Социальный (Social) — работа с людьми, помощь, коммуникация
        5. Предпринимательский (Enterprising) — лидерство, управление, влияние
        6. Конвенциональный (Conventional) — организация, структура, внимание к деталям

        ПРИМЕР ЧАСТИЧНОГО ОТВЕТА (bestJob, summary, jobAdvice):
        {
          "personalityItems": [
            {
              "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
              "title": "Реалистический",
              "percent": 75,
              "description": "Практический подход к решению задач, предпочтение конкретных результатов и работы с технологиями"
            },
            {
              "id": "b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e",
              "title": "Исследовательский",
              "percent": 92,
              "description": "Выраженное аналитическое мышление и стремление к глубокому пониманию систем"
            },
            {
              "id": "c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f",
              "title": "Артистический",
              "percent": 68,
              "description": "Креативность в решении технических задач и способность к нестандартному мышлению"
            },
            {
              "id": "d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a",
              "title": "Социальный",
              "percent": 78,
              "description": "Развитые навыки коммуникации и эффективная работа в команде"
            },
            {
              "id": "e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b",
              "title": "Предпринимательский",
              "percent": 88,
              "description": "Сильные лидерские качества и способность к стратегическому мышлению"
            },
            {
              "id": "f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c",
              "title": "Конвенциональный",
              "percent": 65,
              "description": "Организованность и систематический подход к работе"
            }
          ],
          "personalityDescription": "Вы представляете собой редкое сочетание технического мастерства и развитых soft skills. Ваша способность мыслить системно позволяет видеть общую картину, не теряя фокуса на деталях. Вы естественным образом принимаете на себя роль лидера, вдохновляете команду и создаете инновационные решения. Ваш аналитический ум в сочетании с эмпатией делает вас исключительным специалистом в областях, требующих как глубокой экспертизы, так и управления людьми.",
          "jobs": [
            /* 10 объектов Job с процентами от 70 до 95 */
          ],
          "charts": [
            /* 10 объектов PersonalityChart */
          ],
          "strengths": [
            /* 10 объектов Strength с процентами 80-96 */
          ],
          "weaknesses": [
            /* 10 объектов Weakness с процентами 50-75 */
          ],
          "summary":
            {
              "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
              "description": "Ваш профиль демонстрирует исключительное сочетание технических и управленческих компетенций. Вы способны не только создавать качественные технические решения, но и эффективно руководить командами, принимать стратегические решения и влиять на развитие всей организации."
            },
          "bestJob": {
            "id": "d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a",
            "percent": 96,
            "title": "Tech Lead / Engineering Manager",
            "description": "Руководство командой разработки с глубоким погружением в архитектурные решения. Сочетание технического лидерства с менторством и стратегическим планированием. Работа над высоконагруженными системами в быстрорастущих продуктовых компаниях.",
            "avrSalary": 350000,
            "demand": "Очень высокая"
          },
          "jobAdvice": [
            {
              "id": "e5f6a7b8-c9d0-8e9f-2a3b-4c5d6e7f8a9b",
              "description": "Ориентируйтесь на позиции Tech Lead в растущих технологических компаниях, где ваше влияние будет максимальным. Избегайте больших корпораций с жесткой иерархией на начальном этапе."
            },
            {
              "id": "f6a7b8c9-d0e1-9f0a-3b4c-5d6e7f8a9b0c",
              "description": "Рассмотрите стартапы серии B-C, где уже есть product-market fit, но нужно масштабирование команды и технологий. Это идеальная среда для применения ваших навыков."
            },
            {
              "id": "a7b8c9d0-e1f2-0a1b-4c5d-6e7f8a9b0c1d",
              "description": "Развивайте личный бренд через технический блог, выступления на конференциях и активное участие в open source. Это откроет доступ к лучшим возможностям на рынке."
            },
            {
              "id": "b8c9d0e1-f2a3-1b2c-5d6e-7f8a9b0c1d2e",
        "description": "При выборе компании приоритизируйте команду и инженерную культуру над зарплатой. Работа с сильными коллегами ускорит ваш профессиональный рост и откроет новые перспективы."
        },
        {
        "id": "c9d0e1f2-a3b4-2c3d-6e7f-8a9b0c1d2e3f",
        "description": "Рассмотрите удаленные позиции в международных компаниях. Ваш профиль высоко ценится на глобальном рынке, и это может значительно увеличить ваш доход и возможности для роста."
        }
        ],
        "improvementAdvice": [
        {
        "id": "d0e1f2a3-b4c5-3d4e-7f8a-9b0c1d2e3f4a",
        "description": "Инвестируйте в развитие навыков эффективного делегирования. Создайте систему передачи знаний и ответственности, которая позволит масштабировать ваше влияние и развивать команду."
        },
        {
        "id": "e1f2a3b4-c5d6-4e5f-8a9b-0c1d2e3f4a5b",
        "description": "Изучите основы финансового менеджмента, P&L и метрики бизнеса. Это позволит принимать более взвешенные технологические решения с учетом бизнес-контекста."
        },
        {
        "id": "f2a3b4c5-d6e7-5f6a-9b0c-1d2e3f4a5b6c",
        "description": "Практикуйте эмпатичную коммуникацию при предоставлении обратной связи. Баланс между честностью и поддержкой критически важен для эффективного менторства."
        },
        {
        "id": "a3b4c5d6-e7f8-6a7b-0c1d-2e3f4a5b6c7d",
        "description": "Развивайте понимание организационной динамики и навигации в корпоративной политике. Это поможет эффективнее продвигать технические инициативы и защищать интересы команды."
        },
        {
        "id": "b4c5d6e7-f8a9-7b8c-1d2e-3f4a5b6c7d8e",
        "description": "Создайте устойчивую систему work-life balance. Установите четкие границы рабочего времени и регулярные практики восстановления для предотвращения выгорания."
        },
        {
        "id": "c5d6e7f8-a9b0-8c9d-2e3f-4a5b6c7d8e9f",
        "description": "Инвестируйте в развитие навыков публичных выступлений и презентации идей. Это критически важно для роста влияния и продвижения на более высокие позиции."
        },
        {
        "id": "d6e7f8a9-b0c1-9d0e-3f4a-5b6c7d8e9f0a",
        "description": "Найдите ментора на уровень выше вашей текущей позиции (CTO, VP of Engineering). Регулярные встречи помогут быстрее развивать стратегическое мышление и избегать типичных ошибок."
        }
        ]
        }
INSTRUCTIONS;
    }
}
