import { useTranslation } from '@/shared/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { Offer, Specialist } from '@imarketplace/types/entities';

interface RequirementsMatchCardProps {
  candidate: Offer<{ specialist: Specialist }>;
}

export function RequirementsMatchCard({ candidate }: RequirementsMatchCardProps) {
  const { t } = useTranslation();
  const requirements = candidate.requirements || [];

  // Calculate match statistics
  const totalRequirements = requirements.length;
  const mandatoryRequirements = requirements.filter(req => req.mandatory).length;
  const matchedRequirements = requirements.filter(req => req.matched && req.matched >= 0.7).length; // Matched if score >= 0.7
  const mandatoryMatched = requirements.filter(req => req.mandatory && req.matched && req.matched >= 0.7).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{t('specialistProfile.requirementsMatch')}</span>
          <Badge variant="secondary" className="text-xs">
            {matchedRequirements}/{totalRequirements} {t('specialistProfile.matched')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{totalRequirements}</div>
            <div className="text-xs text-muted-foreground">{t('specialistProfile.total')}</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{mandatoryRequirements}</div>
            <div className="text-xs text-muted-foreground">{t('specialistProfile.mandatory')}</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{matchedRequirements}</div>
            <div className="text-xs text-muted-foreground">{t('specialistProfile.matched')}</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{mandatoryMatched}</div>
            <div className="text-xs text-muted-foreground">{t('specialistProfile.mandatoryMatched')}</div>
          </div>
        </div>

        {/* Requirements list */}
        <div className="space-y-4">
          {requirements.map((req, index) => {
            const isMatched = req.matched !== undefined && req.matched >= 0.7;
            const isPartial = req.matched !== undefined && req.matched > 0 && req.matched < 0.7;
            const matchPercentage = req.matched ? Math.round(req.matched * 100) : 0;
            
            return (
              <div key={req.id || index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2">
                    {isMatched ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : isPartial ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium">{req.requirement}</div>
                      {req.mandatory && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {t('specialistProfile.mandatoryRequirement')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${isMatched ? 'text-green-600' : isPartial ? 'text-yellow-600' : 'text-destructive'}`}>
                      {matchPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isMatched ? t('specialistProfile.matched') : 
                        isPartial ? t('specialistProfile.partialMatch') : 
                        t('specialistProfile.notMatched')}
                    </div>
                  </div>
                </div>

                {/* Comments and questions if available */}
                {req.comment && (
                  <div className="mt-2 p-2 bg-muted rounded text-sm">
                    <div className="font-medium text-sm mb-1">{t('specialistProfile.comment')}:</div>
                    <div>{req.comment}</div>
                  </div>
                )}

                {req.questions && req.questions.length > 0 && (
                  <div className="mt-2">
                    <div className="font-medium text-sm mb-1">{t('specialistProfile.questions')}:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {req.questions.map((q, qIndex) => (
                        <li key={q.id || qIndex}>{q.question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}